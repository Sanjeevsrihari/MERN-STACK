const player = document.querySelector(".player");
const arrow = document.querySelector(".arrow");
let arrowX = 850;
let govidanY = 180;
let score = 0;
let counted = false;
let gameOver = false;
setInterval(movearrow, 40);
function movearrow() {
    if (gameOver) return;
    arrowX -= 13;
    if (arrowX < -40) {
        arrowX = 850;
        counted = false;
        let arrowY = Math.floor(Math.random() * 393);
        arrow.style.top = arrowY + "px";
    }
    arrow.style.left = arrowX + "px";
    if (!counted && arrowX < 10) {
        score++;
        counted = true;
        document.getElementById("score").innerText = "Score: " + score;
    }
    let arrowY = parseInt(arrow.style.top);
    if (
        arrowX <= 50 &&
        arrowX >= 0 &&
        arrowY + 7 >= govidanY &&
        arrowY <= govidanY + 40
    ) {
        gameOver = true;
        alert("Collision!!!");
    }
}
document.addEventListener("keydown", (event) => {
    if ((event.key === "r" || event.key === "R") && gameOver) {
        gameOver = false;
        arrowX = 850;
        govidanY = 180;
        score = 0;
        counted = false;
        player.style.top = govidanY + "px";
        arrow.style.left = arrowX + "px";
        arrow.style.top = Math.floor(Math.random() * 393) + "px";
        document.getElementById("score").innerText = "Score: 0";
        return;
    }
    if (gameOver) return;
    if (event.key === "ArrowDown" && govidanY < 360) {
        govidanY += 10;
    }
    if (event.key === "ArrowUp" && govidanY > 0) {
        govidanY -= 10;
    }
    player.style.top = govidanY + "px";
});