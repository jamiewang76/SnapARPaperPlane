// ComplexMessageEvent.js
// Version: 1.0.1
// Event: On Awake
// Description: Example of sending a complex network event message.
// This example uses the system keyboard to allow the user to send world-space text strings to other users.


///@input Component.Text inputText
/** @type {Text} */
var inputText = script.inputText;

var syncEntity = new global.SyncEntity(script, null, false, "Persist");

var myDataList = [];

/**
 * @class
 */
function MyDataClass() {
    /** @type {string} */
    this.text;

    /** @type {string} */
    this.myID;

    /** @type {ConnectedLensModule.UserInfo} */
    this.sentTo;
}
/** @type {EntityEventWrapper<MyDataClass>} */
var postMessageEvent = syncEntity.getEntityEventWrapper("postMessage");

//@input SceneObject writeletter
/** @type {SceneObject} */
var writeletter = script.writeletter;

//@input SceneObject mailbox
/** @type {SceneObject} */
var mailbox = script.mailbox;

//@input SceneObject startButton
/** @type {SceneObject} */
var startButton = script.startButton;

//@input SceneObject alert
/** @type {SceneObject} */
var alert = script.alert;

function startGame(){
    print("hello");
    script.writeletter.enabled = true;
    script.mailbox.enabled = true;
    script.startButton.enabled = false;
}
script.startGame = startGame;

function getSetUpStatus(){
    return syncEntity.isSetupFinished
}
script.getSetUpStatus = getSetUpStatus;


syncEntity.onSetupFinished.add(function() {
    print("goodbye");
    alert.enabled = false;
});


function create(){
    inputText.text = "Tap to write message";
}
script.create = create;


function post(){

        var data = new MyDataClass();
        data.myID = global.sessionController.getLocalUserId();
        data.myName = global.sessionController.getLocalUserName();

        var userList = global.sessionController.getUsers();
        for (var i = 0; i < userList.length; i++){
            if (userList[i].userId == data.myID){
                userList.splice(i,1);
            }
        }
        if (userList.length > 0){
            data.sentTo = userList[Math.floor(Math.random() * userList.length)];
            // data.sentTo = userList[Math.floor(Math.random() * userList.length)].displayName;
        }else{
            data.sentTo = "";
        }

        data.text = inputText.text;
        // data.text = inputText.text + " from " + data.myName + " to " + data.sentTo.displayName + " at list length " + userList.length;


        postMessageEvent.send(data);
        // myDataList.push(data);
        inputText.text = "";
        print("data sent")
    
};
script.post = post;

function getMyList(){
    for (var i = 0; i < myDataList.length; i++){
        print(myDataList[i].text);
    }
    return myDataList;
}
script.getMyList = getMyList;

postMessageEvent.onEventReceived.add(function(message) {
    var data = message.data;
    if (data.sentTo != ""){
        if (data.sentTo.userId == global.sessionController.getLocalUserId()){
            // var instance = prefab.instantiate(sceneRoot);
            // instance.getTransform().setLocalPosition(data.position);
            // instance.getTransform().setLocalRotation(data.rotation);
            // instance.getComponent("Component.Text").text = data.text;
            myDataList.push(data);
            print("received message")
        }
    }
});

// postMessageEvent.onEventReceived.add(function(message) {
//     var data = message.data;
//     if (data.sentTo != ""){
//         if (data.sentTo.userId == global.sessionController.getLocalUserId()){
//             // var instance = prefab.instantiate(sceneRoot);
//             // instance.getTransform().setLocalPosition(data.position);
//             // instance.getTransform().setLocalRotation(data.rotation);
//             // instance.getComponent("Component.Text").text = data.text;
//             myDataList.push(data);
//         }
//     }
// });

// function postNewMessage() {
//     if (syncEntity.isSetupFinished) {
//         var options = new TextInputSystem.KeyboardOptions();
//         inputText.text = "Start typing...";
//         options.onTextChanged = function(newText, range) {
//             inputText.text = newText;
//         };

//         options.onReturnKeyPressed = function() {
//             var data = new MyDataClass();
            
            // var worldPos = inputText.getTransform().getWorldPosition();
            // var worldToRoot = sceneRoot.getTransform().getInvertedWorldTransform();
            // var pos = worldToRoot.multiplyPoint(worldPos);
            // var forward = worldToRoot.multiplyDirection(camera.getTransform().forward);
            // var up = worldToRoot.multiplyDirection(camera.getTransform().up);
            // var rot = quat.lookAt(forward, up);

            // data.position = pos;
            // data.rotation = rot;
//             data.myID = global.sessionController.getLocalUserId();
//             data.myName = global.sessionController.getLocalUserName();

//             var userList = global.sessionController.getUsers();
//             for (var i = 0; i < userList.length; i++){
//                 if (userList[i].userId == data.myID){
//                     userList.splice(i,1);
//                 }
//             }
//             if (userList.length > 0){
//                 data.sentTo = userList[Math.floor(Math.random() * userList.length)];
//                 // data.sentTo = userList[Math.floor(Math.random() * userList.length)].displayName;
//             }else{
//                 data.sentTo = "";
//             }

//             // data.text = inputText.text;
//             data.text = inputText.text + " from " + data.myName + " to " + data.sentTo.displayName + " at list length " + userList.length;

//             postMessageEvent.send(data);

//             inputText.text = "";
//         };
//         global.textInputSystem.requestKeyboard(options);
//     }
// }
