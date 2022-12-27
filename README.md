# Thank You Supporter - Growth Hack

> This action has a communinity management focus.

Basically everytime someone will Star ⭐ your repository this action will:

* Send you a notification on discord
* Look after the profile of your supporter
	* Check if this supporter has a personal profile repository
  * Create an issue in the personal profile repository

## Inputs

### `template`

* **Description** The template file used your personal content
* **Required** yes
* **Default** `./.github/template/thankyou-template.yml`

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
* **Required** no

### `personal-github-token`

* **Description** The personal account token use for creating issues on 3rd party repo.
* **Required** yes

> ⚠️ Since the Github action token has limited scope, This token needs to be a personal token from the actual user you want to post the issue on his behalf.

## Outputs

### `time`

The time we greeted you.

## Example usage


```yaml
uses: olivierodo/thank-you-supporter@v1.0
with:
  template: './.github/template/thankyou-template.yml'
  discord-webhook: 'https://webhook.discord.com/example/...'
  personal-github-token: ${{ secrets.GH_PERSONAL_TOKEN }} # Where GH_PERSONAL_TOKEN represent a personal token that you store in your secrets
```

### Try it by yourself

Try to star on of the following project to see it in action.

* [RestQA](https://github.com/restqa/restqa)
