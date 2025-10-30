function renderInfoOverlay() {
    return `
        <div id="infoOverlay" class="infoOverlay hidden">
        <div class="infoContent">
            <h2>Controls</h2>
            <ul>
                <li><button class="arrowKeyInfo arrowLeft"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Left:</b> Move left</li>
                <li><button class="arrowKeyInfo arrowRight"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Right:</b> Move right</li>
                <li><button class="arrowKeyInfo arrowUp"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Up:</b> Swim up</li>
                <li><button class="arrowKeyInfo arrowDown"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Down:</b> Swim down</li>
                <li><button class="arrowKeyInfo">⎵</button><b>Space:</b> Attack</li>
                <li><button class="arrowKeyInfo">Ctrl</button><b>Ctrl:</b> Bubble attack</li>
                <li><button type="button" class="audioButton">🔇</button><b>Audio:</b> Toggle sound</li>
                <li><button class="fullscreenButton">⛶</button><b>Fullscreen:</b> Toggle fullscreen</li>
            </ul>
            <button id="closeInfo" class="closeInfo">Close</button>
        </div>
    </div>
    `;
}