export const LANGUAGES = {
  python: { name: 'Python', extension: 'py', mode: 'python' },
  java: { name: 'Java', extension: 'java', mode: 'java' },
  c: { name: 'C', extension: 'c', mode: 'c' },
  cpp: { name: 'C++', extension: 'cpp', mode: 'cpp' },
  html: { name: 'HTML/CSS/JS', extension: 'html', mode: 'html' }
};

export const THEMES = {
  light: 'light',
  dark: 'dark'
};

export const DEFAULT_CODE = {
  python: `# Welcome to CodeVerse Lite!
print("Hello, World!")

# Calculate factorial
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(f"Factorial of 5 is: {factorial(5)}")`,

  java: `// Welcome to CodeVerse Lite!
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Calculate factorial
        int number = 5;
        long factorial = 1;
        for(int i = 1; i <= number; i++) {
            factorial *= i;
        }
        System.out.println("Factorial of " + number + " is: " + factorial);
    }
}`,

  c: `// Welcome to CodeVerse Lite!
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    // Calculate factorial
    int number = 5;
    long factorial = 1;
    for(int i = 1; i <= number; i++) {
        factorial *= i;
    }
    printf("Factorial of %d is: %ld\\n", number, factorial);
    
    return 0;
}`,

  cpp: `// Welcome to CodeVerse Lite!
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Calculate factorial
    int number = 5;
    long factorial = 1;

    for(int i = 1; i <= number; i++) {
        factorial *= i;
    }

    cout << "Factorial of " << number << " is: " << factorial << endl;

    return 0;
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Project - CodeVerse</title>
    <style>
        /* CSS Styles - This is where you write your CSS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            padding: 3rem 0;
            color: white;
        }

        .header h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .feature-card h3 {
            color: white;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .feature-card p {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
        }

        .interactive-section {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .counter-container {
            text-align: center;
            padding: 2rem;
        }

        .counter {
            font-size: 4rem;
            font-weight: bold;
            color: #667eea;
            margin: 1rem 0;
        }

        .buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: #ff6b6b;
        }

        .btn-secondary:hover {
            background: #ff5252;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }

        .dynamic-content {
            margin-top: 2rem;
            padding: 1rem;
            border: 2px dashed #667eea;
            border-radius: 10px;
            min-height: 100px;
        }

        .color-palette {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin: 1rem 0;
        }

        .color-btn {
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .color-btn:hover {
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2.5rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .btn {
                width: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- HTML Structure - This is where you write your HTML -->
        <header class="header">
            <h1>🚀 Welcome to CodeVerse!</h1>
            <p>Build amazing web projects with HTML, CSS, and JavaScript</p>
        </header>

        <section class="features">
            <div class="feature-card">
                <div class="feature-icon">📝</div>
                <h3>HTML Structure</h3>
                <p>Create the foundation of your web pages with semantic HTML markup.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3>CSS Styling</h3>
                <p>Make your website beautiful with modern CSS and animations.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>JavaScript Interactivity</h3>
                <p>Add dynamic behavior and interactivity to your web applications.</p>
            </div>
        </section>

        <section class="interactive-section">
            <h2 style="text-align: center; margin-bottom: 2rem; color: #333;">Interactive Demo</h2>
            
            <div class="counter-container">
                <h3>Counter Example</h3>
                <div class="counter" id="counter">0</div>
                <div class="buttons">
                    <button class="btn" onclick="incrementCounter()">Increment +</button>
                    <button class="btn" onclick="decrementCounter()">Decrement -</button>
                    <button class="btn btn-secondary" onclick="resetCounter()">Reset</button>
                </div>
            </div>

            <div class="counter-container">
                <h3>Background Color Changer</h3>
                <div class="color-palette">
                    <button class="color-btn" style="background: #667eea;" onclick="changeBackground('#667eea')"></button>
                    <button class="color-btn" style="background: #ff6b6b;" onclick="changeBackground('#ff6b6b')"></button>
                    <button class="color-btn" style="background: #4ecdc4;" onclick="changeBackground('#4ecdc4')"></button>
                    <button class="color-btn" style="background: #45b7d1;" onclick="changeBackground('#45b7d1')"></button>
                    <button class="color-btn" style="background: #96ceb4;" onclick="changeBackground('#96ceb4')"></button>
                </div>
                <button class="btn" onclick="randomColor()">Random Color</button>
            </div>

            <div class="counter-container">
                <h3>Dynamic Content</h3>
                <div class="buttons">
                    <button class="btn" onclick="addElement()">Add Element</button>
                    <button class="btn btn-secondary" onclick="clearElements()">Clear All</button>
                </div>
                <div class="dynamic-content" id="dynamicContent">
                    <p style="text-align: center; color: #666;">New elements will appear here...</p>
                </div>
            </div>
        </section>
    </div>

    <script>
        // JavaScript Code - This is where you write your JavaScript
        let counter = 0;
        const counterElement = document.getElementById('counter');
        const dynamicContent = document.getElementById('dynamicContent');

        // Counter functions
        function incrementCounter() {
            counter++;
            updateCounter();
        }

        function decrementCounter() {
            counter--;
            updateCounter();
        }

        function resetCounter() {
            counter = 0;
            updateCounter();
        }

        function updateCounter() {
            counterElement.textContent = counter;
            
            // Change color based on counter value
            if (counter > 0) {
                counterElement.style.color = '#4ecdc4';
            } else if (counter < 0) {
                counterElement.style.color = '#ff6b6b';
            } else {
                counterElement.style.color = '#667eea';
            }
        }

        // Background color functions
        function changeBackground(color) {
            document.body.style.background = color;
        }

        function randomColor() {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#fa709a'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            changeBackground(randomColor);
        }

        // Dynamic content functions
        function addElement() {
            const elementCount = dynamicContent.children.length;
            const newElement = document.createElement('div');
            newElement.style.cssText = \`
                background: #f8f9fa;
                padding: 1rem;
                margin: 0.5rem 0;
                border-radius: 8px;
                border-left: 4px solid #667eea;
                animation: fadeIn 0.5s ease;
            \`;
            
            newElement.innerHTML = \`
                <strong>Element #\${elementCount}</strong>
                <p>Created at: \${new Date().toLocaleTimeString()}</p>
                <button onclick="this.parentElement.remove()" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
            \`;
            
            // Remove the placeholder text if it exists
            if (elementCount === 1 && dynamicContent.children[0].querySelector('p')) {
                dynamicContent.innerHTML = '';
            }
            
            dynamicContent.appendChild(newElement);
        }

        function clearElements() {
            dynamicContent.innerHTML = '<p style="text-align: center; color: #666;">New elements will appear here...</p>';
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        \`;
        document.head.appendChild(style);

        // Initialize
        console.log('🚀 Web project loaded successfully!');
        updateCounter();
    </script>
</body>
</html>`
};