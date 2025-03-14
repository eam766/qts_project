<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404-Page introuvable</title>
    <Link>
</head>
<body >

<div class="falling-code"></div>
<div class="glitch">404</div>
<div class="message">Oops! Page Introuvable.</div>
<a href="{{ url('/') }}" class="btn"> Retourner </a>

</body>
<style>

    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #121214;
        color: white;
        font-family: 'VT323', monospace;
        overflow: hidden;
        position: relative;
    }

    .falling-code {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }

    .char {
        position: absolute;
        color: rgba(0, 255, 0, 0.7);
        font-size: 20px;
        animation: fall linear infinite;
    }

    @keyframes fall {
        0% {
            transform: translateY(-100vh);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }

    .glitch {
        position: relative;
        font-size: 120px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 4px;
        margin-bottom: 20px;
    }

    .glitch::before,
    .glitch::after {
        content: "404";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:  #121214;
        clip: rect(0, 900px, 0, 0);
    }

    .glitch::before {
        left: 2px;
        text-shadow: -3px 0 red;
        animation: glitch-before 0.8s infinite linear alternate-reverse;
    }

    .glitch::after {
        left: -2px;
        text-shadow: -3px 0 blue;
        animation: glitch-after 0.8s infinite linear alternate-reverse;
    }

    @keyframes glitch-before {
        0% { clip: rect(44px, 9999px, 56px, 0); }
        20% { clip: rect(10px, 9999px, 50px, 0); }
        40% { clip: rect(40px, 9999px, 60px, 0); }
        60% { clip: rect(20px, 9999px, 40px, 0); }
        80% { clip: rect(30px, 9999px, 50px, 0); }
        100% { clip: rect(50px, 9999px, 70px, 0); }
    }

    @keyframes glitch-after {
        0% { clip: rect(50px, 9999px, 70px, 0); }
        20% { clip: rect(30px, 9999px, 50px, 0); }
        40% { clip: rect(20px, 9999px, 40px, 0); }
        60% { clip: rect(40px, 9999px, 60px, 0); }
        80% { clip: rect(10px, 9999px, 50px, 0); }
        100% { clip: rect(44px, 9999px, 56px, 0); }
    }

    .message {
        font-size: 24px;
        text-align: center;
        margin-bottom: 30px;
        position: relative;
        animation: glitch-text 1.5s infinite;
    }

    @keyframes glitch-text {
        0% { text-shadow: 2px 2px red, -2px -2px blue; }
        50% { text-shadow: -2px -2px red, 2px 2px blue; }
        100% { text-shadow: 2px 2px red, -2px -2px blue; }
    }

    .btn {
        padding: 15px 30px;
        font-size: 20px;
        text-transform: uppercase;
        text-decoration: none;
        color: white;
        border: 2px solid white;
        background: transparent;
        cursor: pointer;
        position: relative;
        transition: 0.3s;
    }

    .btn:hover {
        background: white;
        color: black;
    }
</style>
</html>


