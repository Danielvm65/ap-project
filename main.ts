controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.sayText("Holding ")
    lastTimestamp = game.runtime()
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprites.destroy(sprite)
    Number_of_enemies += -1
    Home_lifes += -1
})
function Powershot2 (Time: number) {
    damage = Time * 1.2
    if (damage >= 1000) {
        Powershot = sprites.createProjectileFromSprite(img`
            . . . . . . 5 5 5 5 . . . . . . 
            . . . . . 5 5 4 4 5 5 . . . . . 
            . . . . 5 4 4 4 4 4 4 5 . . . . 
            . . 5 5 5 4 2 2 2 2 4 5 5 5 . . 
            . . 5 4 4 2 2 2 2 2 2 4 4 5 . . 
            . . 5 4 2 2 2 2 2 2 2 2 4 5 . . 
            . . . 5 2 2 2 2 2 2 2 2 5 . . . 
            . . . 4 5 2 2 2 2 2 2 5 4 . . . 
            . . . . 4 5 2 2 2 2 5 4 . . . . 
            . . . . . 5 2 2 2 2 5 . . . . . 
            . . . . . 5 2 2 2 2 5 . . . . . 
            . . . . . 5 5 5 5 5 5 . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            `, mySprite, 0, -60)
    } else {
        Powershot = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 5 5 5 . . . . . . . 
            . . . . . 5 4 4 4 5 . . . . . . 
            . . . . . 5 4 2 4 5 . . . . . . 
            . . . . . 5 4 2 4 5 . . . . . . 
            . . . . . 5 4 4 4 5 . . . . . . 
            . . . . . . 5 4 5 . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            `, mySprite, 0, -60)
    }
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    Powershot2(game.runtime() - lastTimestamp)
    mySprite.sayText(damage)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
})
function Spawn (num: number) {
    for (let index = 0; index < num; index++) {
        Enemy_Sprite = sprites.create(list._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnRandomTile(Enemy_Sprite, assets.tile`myTile0`)
        Enemy_Sprite.setVelocity(0, 20)
        pause(500)
        if (level == 3) {
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
            Giant_monster.setVelocity(0, 30)
            for (let index = 0; index < 5; index++) {
                tiles.placeOnRandomTile(Giant_monster, assets.tile`myTile0`)
                pause(100)
            }
        }
    }
}
let Giant_monster: Sprite = null
let Enemy_Sprite: Sprite = null
let Powershot: Sprite = null
let damage = 0
let list: Image[] = []
let level = 0
let lastTimestamp = 0
let mySprite: Sprite = null
let Home_lifes = 5
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
lastTimestamp = game.runtime()
level = 0
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
list = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, img`
    .............beebbbb............
    ............eebbbb4bb...........
    ............eb344bb4bb..........
    ............e44334bb4bb.........
    ............eb433344b4be........
    ............4eb43344444be.......
    ...........bd4eb43333344bb......
    ..........b455d4443333444bb.....
    ..........4d5555d444333444bb....
    .........4555555dd4b4443444be...
    ........bd5555d555d4bb444444ee..
    ........b55ddd665555bb4b44444ee.
    .......bd5555677655554ebb44444eb
    .......43222558855555d4eeb44b4ee
    ......b422332ddd555222d4eebbb4be
    ......be22232ed55522332db4ebbbbe
    .....bde22222e555e22232edd4bbbbe
    .....b52e222e3555e22222eddd4ebee
    ....bd552eee355552e222e355544eee
    ....665dd5555555552eee355dd4deee
    ...6776555555555555555551554d4ee
    ...4885222555dddd6655551544d4eee
    ..b45522332555dd677611d444ddeee.
    ..4d5222232e55555881d44ddd4eee..
    .bdd5e22222e555115114d54d4ee....
    .b55d2e222e351144d1d55eeee......
    bd5ddd2eee3d444555dd4e..........
    b555115dddd55d544eede...........
    4511d444d5544ee...4de...........
    41d4555d4ee........44...........
    41554eede.......................
    44ee...4e.......................
    `]
let Spawn_enemy_loc = tiles.getTilesByType(assets.tile`myTile0`)
let Number_of_enemies = 10
let amount_of_enemies = 10
info.setLife(3)
Spawn(amount_of_enemies)
forever(function () {
    if (Home_lifes == 0) {
        game.setGameOverMessage(false, "Too many monsters got past")
        game.gameOver(false)
    }
    if (info.life() == 0) {
        game.setGameOverMessage(false, "RIP you lose ")
    }
})
forever(function () {
    if (Number_of_enemies == 0) {
        if (level == 3) {
            Number_of_enemies = 20
        }
        level += 1
        mySprite.sayText(level, 100, false)
        pause(2000)
        game.splash("Good job next wave")
        Number_of_enemies = 10
        Spawn(amount_of_enemies)
    }
})
