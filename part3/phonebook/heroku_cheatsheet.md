> https://blog.softup.co/how-to-deploy-a-monorepo-to-multiple-heroku-apps-using-github-actions/

1. Create heroku project with given name
$ heroku create --region eu # Creates random name
$ heroku create jukifso-part3-phonebook --remote heroku-jukifso-part3-phonebook --region eu # Creates chosen name

2. Add buildpack for multi-procfile (this can prolly be skipped)
$ heroku buildpacks:add -a jukifso-part3-phonebook heroku-community/multi-procfile

3. Add buildpack for nodejs
$ heroku buildpacks:add -a jukifso-part3-phonebook heroku/nodejs

4. Add buildpack for monorepo ("-i 1" means put this first)
$ heroku buildpacks:add -a jukifso-part3-phonebook https://github.com/lstoll/heroku-buildpack-monorepo -i 1

5. Point config to a procfile starting at root of the repo (this can prolly be skipped too)
$ heroku config:set -a jukifso-part3-phonebook PROCFILE=part3/phonebook/Procfile

6. Set new project root directory
$ heroku config:add -a jukifso-part3-phonebook APP_BASE=part3/phonebook

7. Set git remote for convenience to heroku
$ git remote add jukifso-part3-phonebook https://git.heroku.com/jukifso-part3-phonebook.git

8. Push changes to heroku git repo
$ git push jukifso-part3-phonebook main # if remote-url set
$ git push https://git.heroku.com/jukifso-part3-phonebook.git HEAD:main # else

9. Check logs
$ heroku logs -a jukifso-part3-phonebook --tail

```
// Procfile
web: npm start
```
