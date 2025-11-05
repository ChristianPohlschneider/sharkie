function renderInfoOverlay() {
    return `
        <div id="infoOverlay" class="infoOverlay hidden">
        <div class="infoContent">
            <h2>Controls</h2>
            <ul>
                <li><button class="arrowKeyInfo arrowLeft"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Left:</b> &nbsp; Move left</li>
                <li><button class="arrowKeyInfo arrowRight"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Right:</b> &nbsp; Move right</li>
                <li><button class="arrowKeyInfo arrowUp"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Up:</b> &nbsp; Swim up</li>
                <li><button class="arrowKeyInfo arrowDown"><img src="img/assets/img/arrow.png" alt="arrow key"></button><b>Arrow Down:</b> &nbsp; Swim down</li>
                <li><button class="arrowKeyInfo">⎵</button><b>Space:</b> &nbsp; Fin Slap</li>
                <li><button class="arrowKeyInfo">Ctrl</button><b>Ctrl:</b> &nbsp; Bubble attack</li>
                <li><button type="button" class="audioButton">🔇</button><b>Audio:</b> &nbsp; Toggle sound</li>
                <li><button class="fullscreenButton">⛶</button><b>Fullscreen:</b> &nbsp;dddddddddddddddddddddddddddd Toggle fullscreen</li>
            </ul>
            <button id="closeInfo" class="closeInfo">Close</button>
        </div>
    </div>
    `;
}