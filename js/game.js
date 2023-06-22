class Game {
    // code to be added 
    constructor() {

        this.startScreen = document.getElementById
        ('game-intro')
        this.gameScreen = document.getElementById
        ('game-screen')
        this.gameEndScreen = document.getElementById
        ('game-end')

        this.player = null;
        this.height = 600
        this.width = 500
        this.player = new Player(this.gameScreen)
        this.obstacle = [new Obstacle(this.gameScreen)]
        this.isGameOver = false
        this.score = 0
        this.lives = 3
    }

    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'

        this.gameLoop()
    }

    gameLoop() {
        this.update()

        if (Math.random() > 0.98 && this.obstacle.length < 1) {
            this.obstacle.push(new Obstacle(this.gameScreen));
          }


          if(this.isGameOver){
            console.log('GameOver')
          }
        requestAnimationFrame(() => this.gameLoop())
    }

    update() {
        this.player.move()
        const obstacleToKeep = []
        this.obstacle.forEach(obstacle => {
            obstacle.move()
            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.lives -= 1
            } else if (obstacle.top > this.gameScreen.offsetHeight) {
                this.score += 1
            } else {
                obstacleToKeep.push(obstacle)
            }
        })

        this.obstacle = obstacleToKeep;

        if(this.lives <= 0){
            this.isGameOver = true 
        }
    }
}