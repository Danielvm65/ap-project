namespace SpriteKind {
    export const superenemy = SpriteKind.create()
    export const Superduper = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . 5 4 4 5 . . . . . . 
        . . . . . 5 4 4 4 4 5 . . . . . 
        . . . . . 5 4 2 2 4 5 . . . . . 
        . . . . . 5 4 2 2 4 5 . . . . . 
        . . . . . . 4 2 2 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -30)
})
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    Home_lifes += -1
    sprites.destroy(sprite)
    Number_of_enemies += -1
    if (Home_lifes == 0) {
        game.gameOver(false)
        game.setGameOverMessage(false, "GAME OVER!")
    }
})
function Spawn (num: number) {
    for (let index = 0; index < num; index++) {
        Enemy_Sprite = sprites.create(list._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnRandomTile(Enemy_Sprite, assets.tile`myTile0`)
        Enemy_Sprite.setVelocity(0, randint(8, 14))
    }
    Number_of_enemies = 10
    if (level >= 3) {
        Number_of_enemies = 15
        for (let index = 0; index < snake; index++) {
            Giant_monster = sprites.create(img`
                . . . . . c c c c c c c . . . . 
                . . . . c 6 7 7 7 7 7 6 c . . . 
                . . . c 7 c 6 6 6 6 c 7 6 c . . 
                . . c 6 7 6 f 6 6 f 6 7 7 c . . 
                . . c 7 7 7 7 7 7 7 7 7 7 c . . 
                . . f 7 8 1 f f 1 6 7 7 7 f . . 
                . . f 6 f 1 f f 1 f 7 7 7 f . . 
                . . . f f 2 2 2 2 f 7 7 6 f . . 
                . . c c f 2 2 2 2 7 7 6 f c . . 
                . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
                c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
                f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
                f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
                f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
                . f 6 1 1 1 1 1 6 6 6 6 c . . . 
                . . f f c c c c c c c c . . . . 
                `, SpriteKind.Enemy)
            tiles.placeOnRandomTile(Giant_monster, assets.tile`myTile0`)
            Giant_monster.setVelocity(0, 5)
            pause(100)
        }
    }
}
function update () {
    if (level == 5) {
        game.setGameOverMessage(true, "You saved us!")
        game.gameOver(true)
    }
    game.splash("good job next wave")
    level += 1
    mySprite.sayText(level)
    Spawn(amount_of_enemies)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    Number_of_enemies += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    Number_of_enemies += -1
    if (info.life() == 0) {
        game.setGameOverMessage(false, "GAME OVER!")
        game.gameOver(false)
    }
})
let Giant_monster: Sprite = null
let Enemy_Sprite: Sprite = null
let Number_of_enemies = 0
let projectile: Sprite = null
let snake = 0
let amount_of_enemies = 0
let list: Image[] = []
let level = 0
let mySprite: Sprite = null
let Home_lifes = 0
Home_lifes = 5
mySprite = sprites.create(img`
    . . . . . . . 3 3 . . . . . . . 
    3 . . . . . 3 3 3 3 . . . . . 3 
    3 . . . . . 3 3 3 3 . . . . . 3 
    3 . . . . . 3 3 3 3 . . . . . 3 
    3 3 . . . . 3 3 3 3 . . . . 3 3 
    3 3 . . . . 3 3 3 3 . . . . 3 3 
    3 3 . . . . 3 3 3 3 . . . . 3 3 
    3 3 . . . . 3 3 3 3 . . . . 3 3 
    3 3 . . . 3 3 3 3 3 3 . . . 3 3 
    3 3 . . . 3 3 5 5 3 3 . . . 3 3 
    3 3 3 . . 3 2 5 5 2 3 . . 3 3 3 
    3 3 3 3 3 3 2 5 5 2 3 3 3 3 3 3 
    . 3 3 3 3 3 2 5 5 2 3 3 3 3 3 . 
    . . 3 3 3 3 2 f f 2 3 3 3 3 . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . . . . 4 4 . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 50, 50)
mySprite.setStayInScreen(false)
let lastTimestamp = game.runtime()
level = 1
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
list = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . 7 7 7 7 7 7 7 7 7 7 . . . 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . . 7 7 7 7 7 7 7 7 7 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 . . . 2 
    . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . . . . . 2 2 2 2 2 2 2 2 2 2 
    . . . . . . . . 2 2 2 2 2 2 2 2 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . 9 9 9 9 9 9 9 9 9 9 9 9 9 . . 
    . 9 9 9 9 9 9 9 9 9 9 9 9 9 . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
let Spawn_enemy_loc = tiles.getTilesByType(assets.tile`myTile0`)
amount_of_enemies = 10
Spawn(amount_of_enemies)
info.setLife(3)
snake = 5
game.onUpdate(function () {
    if (Number_of_enemies == 0) {
        update()
    }
})
