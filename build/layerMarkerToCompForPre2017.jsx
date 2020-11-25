var theComp = app.project.activeItem;
var theLayer = theComp.selectedLayers[0];
var theTimes = [];
for (var i = 1; i <= theLayer.property("Marker").numKeys; i++) {
    theTimes.push(theLayer.property("Marker").keyTime(i));
}
for (var i = 1; i <= theComp.numLayers; i++) {
    theComp.layer(i).selected = false;
}
for (var i = 0; i < theTimes.length; i++) {
    theComp.time = theTimes[i];
    app.executeCommand(2157);
}