A translation helper

Uses the key `id` to dig the translation from the global `window.lang`.

An example of a localized settings view:

```js
<div>
	<h1><Lang id="settings.title" /></h1>
	<p><Lang id="settings.description" /></p>
</div>
```

If the string id does not exist (or is something else than a string), you get an error:

```js
<div>
	Here's a translation: <Lang id="settings.titel" />. Was that right?
</div>
```
