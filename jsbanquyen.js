/Flashing Neon /
var message="Copyright © 2013 - Minh"
var neonbasecolor="black"
var neontextcolor="red"
var neontexsize="4"
var neontextcolor2="#00FFFF"
var flashspeed=50						// speed of flashing in milliseconds
var flashingletters=5						// number of letters flashing in neontextcolor
var flashingletters2=20					// number of letters flashing in neontextcolor2 (0 to disable)
var flashpause=0						// the pause between flash-cycles in milliseconds
///No need to edit below this line/////
var n=0
if (document.all||document.getElementById){
document.write('<font color="'+neonbasecolor+neontexsize+'">')
for (m=0;m<message.length;m++)
document.write('<span id="neonlight'+m+'">'+message.charAt(m)+'</span>')
document.write('</font>')
}
else
document.write(message)
function crossref(number){
var crossobj=document.all? eval("document.all.neonlight"+number) : document.getElementById("neonlight"+number)
return crossobj
}
function neon(){
//Change all letters to base color
if (n==0){
for (m=0;m<message.length;m++)
crossref(m).style.color=neonbasecolor
}
//cycle through and change individual letters to neon color
crossref(n).style.color=neontextcolor
if (n>flashingletters-1) crossref(n-flashingletters).style.color=neontextcolor2
if (n>(flashingletters+flashingletters2)-1) crossref(n-flashingletters-flashingletters2).style.color=neonbasecolor
if (n<message.length-1)
n++
else{
n=0
clearInterval(flashing)
setTimeout("beginneon()",flashpause)
return
}
}
function beginneon(){
if (document.all||document.getElementById)
flashing=setInterval("neon()",flashspeed)
}
beginneon()