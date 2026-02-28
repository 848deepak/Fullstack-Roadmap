# Module 01: HTML (HyperText Markup Language)

## 1. Concept Overview
HTML is the standard markup language used to create the structure and content of a web page. It is not a programming language (it has no logic, loops, or variables); rather, it uses a series of nested "tags" to describe to the browser how text, images, and links should be organized.

## 2. Theory from Scratch
- **Elements & Tags:** An element usually consists of an opening tag (`<p>`), content, and a closing tag (`</p>`).
- **Attributes:** Provide additional information about an element (e.g., `href` in `<a href="https://google.com">`). Always specified in the opening tag.
- **The Boilerplate:** Every valid HTML5 document requires:
  - `<!DOCTYPE html>`: Tells the browser to use HTML5 standards.
  - `<html>`: The root element.
  - `<head>`: Meta-information (title, charsets, linked styles) not visible on the page.
  - `<body>`: The visible content of the page.

## 3. Internal Working (Under the Hood)
When a browser receives an HTML file, the HTML Parser reads it token by token from top to bottom. It translates these tokens into **Nodes** and builds a tree structure in memory known as the **DOM (Document Object Model)**.

If the parser encounters a blocking script (`<script src="...">`), it **halts DOM construction**, downloads the script, and executes it before continuing. This is why scripts are traditionally placed at the bottom of the `<body>`, or loaded using `defer`/`async` attributes.

## 4. Why it is used in Production
HTML is the only language a browser natively understands for document structure. Even the most complex React or Next.js enterprise applications ultimately compile down to plain HTML nodes rendered in the browser. Proper use of semantic HTML is critical for Accessibility (Screen Readers) and Search Engine Optimization (SEO).

## 5. Architecture Diagrams

**The DOM Tree Construction:**
```text
HTML Document
└── <html>
    ├── <head>
    │   ├── <title> (Text Node: "Page Title")
    │   └── <meta charset="UTF-8">
    └── <body>
        ├── <header>
        │   └── <h1> (Text Node: "Welcome")
        ├── <main>
        │   └── <p> (Text Node: "This is a paragraph.")
        └── <footer>
```

## 6. Performance Considerations
- **Minimize DOM Depth:** Extremely deeply nested `<div>`s increase parsing time and memory usage. Keep the structure flat where possible.
- **Resource Hints:** Use `<link rel="preload">` in the `<head>` to tell the browser to download critical assets (like fonts or hero images) immediately, without waiting for the CSS/JS to tell it to.
- **Lazy Loading:** For images below the fold, use `<img src="..." loading="lazy" />` to save bandwidth and speed up initial page load.

## 7. Security Considerations
- **XSS (Cross-Site Scripting):** Never inject un-sanitized user input directly into HTML. An attacker could input `<script>stealCookies()</script>`.
- **Target Blank Vulnerability:** When linking to external sites using `target="_blank"`, use `rel="noopener noreferrer"`. Without this, the newly opened tab gains partial control over the original tab via the `window.opener` API, allowing for phishing attacks.

## 8. Common Mistakes
- **Div Soup:** Using `<div>` for absolutely everything. It provides no semantic meaning.
- **Missing Alt Text:** Forgetting `alt=""` on images destroys accessibility for visually impaired users and hurts SEO. (If an image is strictly decorative, use `alt=""` so screen readers skip it).
- **Multiple `<h1/>` Tags:** A page should really only have one primary `<h1>` tag indicating the document's main topic.

## 9. Interview Questions
1. **Q:** What is Semantic HTML and why is it important?
   **A:** Semantic HTML involves using tags that describe their meaning (e.g., `<article>`, `<nav>`, `<header>`) rather than presentation (`<div>`, `<span>`). It is crucial for SEO, screen readers, and maintaining readable code.
2. **Q:** Explain the difference between `defer` and `async` in script tags.
   **A:** Both download the script in the background without blocking HTML parsing. `async` executes the script the moment it finishes downloading (potentially out of order). `defer` guarantees execution occurs only *after* the DOM is fully parsed, maintaining order.
3. **Q:** What are data attributes?
   **A:** Custom attributes used to store extra information within standard HTML tags (`data-user-id="123"`), which can then be easily accessed by CSS or JavaScript.

## 10. Production-Level Best Practices
- **Accessibility (a11y) First:** Always construct HTML with screen readers in mind. Use proper forms (`<label for="id">`), semantic landmarks, and ARIA roles only when native semantic tags fall short.
- **SEO Optimization:** Ensure every page has a unique `<title>` and a `<meta name="description">`. Use Open Graph (`<meta property="og:title">`) tags for beautiful social media previews.
- **Valid HTML:** Run production templates through the W3C Markup Validation Service to catch unclosed tags which can cause bizarre rendering bugs across different browsers.
