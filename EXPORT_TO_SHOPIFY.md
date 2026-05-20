# How to Port This Site to Your Shopify Theme

That's awesome! While this application is built in Next.js (React) and Tailwind CSS, you can easily port these designs and features into your Shopify Liquid theme.

## 1. Exporting the Full Code
To get all the code, assets, and React components you see here:
1. Click the **Settings** gear icon in the top right of this preview or editor window.
2. Select **Export**.
3. You can either download a **ZIP file** of the entire repository or export it directly to **GitHub**.

## 2. Standalone Code for the Custom Neon Cursor 
Since Shopify uses Vanilla JavaScript and Liquid (not React by default), you can't just copy/paste the React code for the cursor. 

Instead, copy the following HTML/CSS/JS snippet and paste it right above the `</body>` tag in your Shopify `theme.liquid` file. It accurately mimics the exact glow, spring physics, and hover states we just built:

```html
<!-- STANDALONE NEON CURSOR FOR SHOPIFY -->
<style>
/* Hide default cursor on desktop if desired */
@media (pointer: fine) {
  /* body, a, button, iframe { cursor: none !important; } */
}

#custom-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: #5E0008; /* Crimson */
  border-radius: 50%;
  pointer-events: none;
  z-index: 2147483647; /* Ensure it's on top of everything */
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}

#custom-cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(220, 20, 60, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 2147483646;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, border-width 0.3s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 15px rgba(220, 20, 60, 0.3);
}

#custom-cursor-ring.is-hovering {
  width: 72px;
  height: 72px;
  background-color: rgba(220, 20, 60, 0.15);
  border-color: rgba(220, 20, 60, 1);
  border-width: 2px;
  box-shadow: 0 0 40px 8px rgba(220, 20, 60, 0.8), inset 0 0 20px 4px rgba(220, 20, 60, 0.5);
}

#custom-cursor-ring.is-hovering-subtle {
  width: 62px;
  height: 62px;
  background-color: rgba(94, 0, 8, 0.25);
  border-color: rgba(94, 0, 8, 1);
  border-width: 2px;
  box-shadow: 0 0 50px 12px rgba(220, 20, 60, 0.9), inset 0 0 25px 6px rgba(220, 20, 60, 0.7);
}

/* Hide on mobile devices */
@media (pointer: coarse) {
  #custom-cursor-dot, #custom-cursor-ring {
    display: none !important;
  }
}
</style>

<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.getElementById('custom-cursor-dot');
    const ring = document.getElementById('custom-cursor-ring');
    
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    
    // Track mouse position
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });
    
    // Smooth trailing spring effect
    function animateRing() {
      const ease = 0.15; // Adjust this for faster/slower trailing
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect function
    const hoverElements = 'a, button, input, textarea, select, [role="button"], iframe, .cursor-pointer';
    
    function attachHoverEvents(el) {
       el.addEventListener('mouseenter', () => {
         if (el.closest('.platform-link') || el.classList.contains('platform-link')) {
           ring.classList.add('is-hovering-subtle');
         } else {
           ring.classList.add('is-hovering');
         }
       });
       el.addEventListener('mouseleave', () => {
         ring.classList.remove('is-hovering', 'is-hovering-subtle');
       });
    }

    // Attach to existing elements
    document.querySelectorAll(hoverElements).forEach(attachHoverEvents);
    
    // Attach to dynamically loaded elements (for Shopify filtering, infinite scroll, etc)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // If it's an element
             // Check the node itself
             if (node.matches(hoverElements)) attachHoverEvents(node);
             // Check its children
             node.querySelectorAll(hoverElements).forEach(attachHoverEvents);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
</script>
```

## 3. Emulating the "Vibe" in Shopify
If you want the entire dark mode aesthetic:
* **Background:** Go into your Shopify Theme Settings -> Colors and set your background or `body` to `#050505` (Matte Black).
* **Accents:** Use `#B76E79` (Rose Gold/Copper) and `#5E0008` (Oxblood Crimson) for hover states, buttons, or border accents. 
* **Font:** You can add `Inter` or `Space Grotesk` through Shopify's typography selector to match this aesthetic. Or use serif/spaced typography for the wordmark if it's rendered as text.
* **Iframes:** Use the Audiomack and Instagram custom HTML block embeds in the Shopify customizer essentially exactly as they are constructed here.

## 4. Exporting Visual Archive Images (The Vault)
All of the brand-new lifestyle, portal, crest, dragon, and pet collection images have been organized and imported into this applet's `/public` folder as `gallery-0.png` through `gallery-37.png`. 

To use these in your Shopify visual archive or product pages:
1. When you extract the ZIP (as instructed in Step 1), open the `public` folder.
2. Upload all the `.png` files to your **Shopify Admin > Content > Files** dashboard.
3. You can then use them everywhere in your Shopify store using the image picker or by directly referencing their Shopify CDN URL.

Let me know if you want me to write vanilla HTML/CSS elements for any of the other specific components (like the Radar)!
