(ns control
  (:require
   [babashka.process :as b]
   [clojure.edn :as edn]
   [clojure.java.io :as io]))

(defn get-config [env]
  (-> "config.edn"
      io/file slurp
      edn/read-string
      (get env)
      (assoc :env env)))

(defn build []
  (println "📦 installing dependencies & building solidstart...")
  (b/shell "pnpm install")
  (b/shell "pnpm build"))

(defn press [{:keys [image]}]
  (let [{img-name :name :keys [tag]} image]
    (println "🐳 building docker image:" (str img-name ":" tag))
    (b/shell "docker build --platform linux/amd64 -t" (str img-name ":" tag) ".")))

(defn register [{:keys [cloud image]}]
  (let [{:keys [project-id region]} cloud
        {img-name :name :keys [tag]} image
        remote-tag (format "%s-docker.pkg.dev/%s/images/%s:%s"
                           region project-id img-name tag)]
    (println "🚀 Pushing image to Artifact Registry...")
    (b/shell "docker tag" (str img-name ":" tag) remote-tag)
    (b/shell "docker push" remote-tag)))

(defn deploy [{:keys [env cloud image backend]}]
  (let [{:keys [project-id region]} cloud
        {img-name :name :keys [tag]} image
        backend-url (:url backend)
        app-env (case env :prod "production" :local "local")
        remote-tag (format "%s-docker.pkg.dev/%s/images/%s:%s"
                           region project-id img-name tag)]
    (println (format "☁️ Deploying [%s] to Cloud Run..." app-env))
    (b/shell "gcloud" "run" "deploy" img-name
             "--image" remote-tag
             "--region" region
             "--project" project-id
             "--set-env-vars" (str "API_URL=" backend-url
                                   ",APP_ENV=" app-env
                                   ",HOST=0.0.0.0")
             "--allow-unauthenticated")))

(defn completion-msg [task]
  (str "🚀 *" (name task) "*"
       " job is done. 🚀"))

(defn -main [& args]
  (let [[env-str task-str] args]
    (assert env-str "❌ Environment (prod/local) is required.")
    (assert task-str "❌ Task is required.")
    (let [env (keyword env-str)
          task (keyword task-str)
          cfg (get-config env)]
      (case task
        :build (build)
        :press (press cfg)
        :register (register cfg)
        :deploy (deploy cfg)
        :all (do (build)
                 (press cfg)
                 (register cfg)
                 (deploy cfg))
        (do (println (str "📖 Usage: bb control.clj "
                          "[env] [build|press|register|deploy|all]"))
            (System/exit 1)))
      (println (completion-msg task)))))

(apply -main *command-line-args*)
