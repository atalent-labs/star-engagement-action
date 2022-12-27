# Thank You Supporter - Growth Hack

> A Github Action that engage new supporter when they star your project

Basically everytime someone will Star ⭐ your repository this action will:

* Notify you on discord
* Look after the profile of your supporter
	* Check if this supporter has a personal profile repository
  * Create an issue in the personal profile repository with your selected message

## Inputs

### `template`

* **Description** The template file used your personal content
* **Required** yes
* **Default** `./.github/templates/thankyou-template.yml`

In your template we you can use placeholders:

* `{{ username }}`: The username of the user that star your project
* `{{ repo }}`: The name of the repo where the Github action is installed

#### Example

```yaml
notification:
  discord: |
    Congratulation **{{ repo }}** got a new star ⭐ from **[{{ username }}](https://github.com/{{username}}/{{username}})**

issue:
  title: {{ repo }} > Thank you for your contribution
  body: |
    Hi {{username}} 👋,

    Thank for sharing your interest into {{ repo }}.
    Giving a star means a lot for us.
```

### `discord-webhook`

* **Description** The URL of the webhook channel where you want to receive the notification
* **Required** yes

> ⚠️ Since the Discord webhook is a credential we recommend you to store it in the secrets.

### `personal-github-token`

* **Description** The personal account token use for creating issues on 3rd party repo.
* **Required** yes

> ⚠️ Since the Github action token has limited scope, This token needs to be a personal token from the actual user you want to post the issue on his behalf.

## Example usage


```yaml
name: Thank you for the star

on:
  watch:
    types: [started]
jobs:
  thanks:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: olivierodo/star-thankyou-action@0.0.1
      with:
        template: './.github/templates/thankyou-support.yml'
        discord-webhook: ${{ secrets.DISCORD_WEBHOOK }}
        personal-github-token: ${{ secrets.GH_PERSONAL_ACCESS_TOKEN }}
```

### Try it by yourself

Try to star on of the following project to see it in action.

* [RestQA](https://github.com/restqa/restqa)

---

# Development

In order to run the code locally you can

* Install the dependencies: `npm i`
* Run the test `npm test`
* Try it out:
  * Copy the env variables: `cp .env.example .env`
  * Edit the `.env` 
  * Run the script `npm run start:dev`
