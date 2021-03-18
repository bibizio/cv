window.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.intersectionRatio > 0) {
        document
          .querySelector(`.toc-entry a[href="#${id}"]`)
          .parentElement.classList.add("active");
      } else {
        document
          .querySelector(`.toc-entry a[href="#${id}"]`)
          .parentElement.classList.remove("active");
      }
    });
  });

  document.querySelectorAll("h2, h3, h4, h5, h6").forEach((header) => {
    observer.observe(header);
  });
});