controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.sayText("Holding ")
    lastTimestamp = game.runtime()
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    Powershot(game.runtime() - lastTimestamp)
    mySprite.sayText(mySprite2)
})
function Powershot (Time: number) {
    mySprite2 = Time * 1.2
}
let mySprite2 = 0
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
