"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', function () {
    const loadComponent = (containerId, componentPath, cssPath) => __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById(containerId);
        if (container) {
            try {
                const response = yield fetch(componentPath);
                container.innerHTML = yield response.text();
                // Load the CSS file
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssPath;
                document.head.appendChild(link);
            }
            catch (error) {
                console.error(`Error loading component ${componentPath}:`, error);
            }
        }
    });
    loadComponent('header-container', './components/header/header.html', './components/header/header.css').then(() => console.log('Header loaded'));
    // loadComponent('block1-container', './components/block1/block1.html', './components/block1/block1.css');
    // loadComponent('footer-container', './components/footer/footer.html', './components/footer/footer.css');
    // Add more loadComponent calls as needed
});
