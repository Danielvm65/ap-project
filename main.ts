controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.sayText("Holding ")
    lastTimestamp = game.runtime()
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
function Spawn (num: number) {
    for (let index = 0; index < num; index++) {
        let level = 0
        Monster_1.setVelocity(0, 50)
        tiles.placeOnTile(list._pickRandom(), Spawn_enemy_loc._pickRandom())
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
            Giant_monster.setVelocity(0, 80)
            for (let index = 0; index < 5; index++) {
                tiles.placeOnRandomTile(Giant_monster, assets.tile`myTile0`)
                pause(100)
            }
        }
    }
}
let Giant_monster: Sprite = null
let Powershot: Sprite = null
let damage = 0
let Spawn_enemy_loc: tiles.Location[] = []
let Monster_1: Sprite = null
let list: Sprite[] = []
let lastTimestamp = 0
let mySprite: Sprite = null
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
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
list = [Monster_1]
let Monster_2 = 0
let Monster_3 = 0
Monster_1 = sprites.create(img`
    . . . . . . . . c c c c . . . . 
    . . . . . . c c d d d d c . . . 
    . . . . . c c c c c c d c . . . 
    . . . . c c 4 4 4 4 d c c . c c 
    . . . c 4 d 4 4 4 4 4 1 c c 4 c 
    . . c 4 4 4 1 4 4 4 4 d 1 c 4 f 
    . c 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
    f 4 4 4 4 4 1 1 c f 4 4 1 f 4 f 
    f 4 4 4 f 4 1 c 4 f 4 4 1 f 4 f 
    f 4 4 4 4 4 1 4 4 f 4 4 d f f f 
    . f 4 4 4 4 1 c c 4 4 d f f . . 
    . . f f 4 d 4 4 4 4 4 c f . . . 
    . . . . f f 4 4 4 4 c d b c . . 
    . . . . . . f f f f d d d c . . 
    . . . . . . . . . . c c c . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
Spawn_enemy_loc = tiles.getTilesByType(assets.tile`myTile0`)
let PLayer_life = 3
