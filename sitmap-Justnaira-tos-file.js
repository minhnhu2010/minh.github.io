if (typeof jQuery == 'undefined') {
    cekjq = {};
    cekjq.s = document.createElement('script');
    cekjq.s.src = 'https://sites.google.com/site/minhnhu11/sitmap-jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(cekjq.s)
}
var postTitle = new Array();
var postUrl = new Array();
var postMp3 = new Array();
var postDate = new Array();
var postLabels = new Array();
var postBaru = new Array();
var sortBy = "titleasc";
var tocLoaded = false;
var numChars = 250;
var postFilter = '';
var numberfeed = 0;

function loadtoc(h) {
    function getPostData() {
        if ("entry" in h.feed) {
            var a = h.feed.entry.length;
            numberfeed = a;
            ii = 0;
            for (var i = 0; i < a; i++) {
                var b = h.feed.entry[i];
                var c = b.title.$t;
                var d = b.published.$t.substring(0, 10);
                var e;
                for (var k = 0; k < b.link.length; k++) {
                    if (b.link[k].rel == 'alternate') {
                        e = b.link[k].href;
                        break
                    }
                }
                var f = '';
                for (var k = 0; k < b.link.length; k++) {
                    if (b.link[k].rel == 'enclosure') {
                        f = b.link[k].href;
                        break
                    }
                }
                var g = '';
                if ("category" in b) {
                    for (var k = 0; k < b.category.length; k++) {
                        g = b.category[k].term;
                        var l = g.lastIndexOf(';');
                        if (l != -1) {
                            g = g.substring(0, l)
                        }
                        postLabels[ii] = g;
                        postTitle[ii] = c;
                        postDate[ii] = d;
                        postUrl[ii] = e;
                        postMp3[ii] = f;
                        if (i < 10) {
                            postBaru[ii] = true
                        } else {
                            postBaru[ii] = false
                        };
                        ii = ii + 1
                    }
                }
            }
        }
    }
    getPostData();
    sortBy = "titleasc";
    sortPosts(sortBy);
    sortlabel();
    tocLoaded = true;
    displayToc2();
    document.write('</br><a href="http://minhsg.blogspot.com/" style="font-size: 10px; text-decoration:none; color: #616469;">Widget by Anh Minh</a>')
}

function filterPosts(a) {
    scroll(0, 0);
    postFilter = a;
    displayToc(postFilter)
}

function allPosts() {
    sortlabel();
    postFilter = '';
    displayToc(postFilter)
}

function sortPosts(b) {
    function swapPosts(x, y) {
        var a = postTitle[x];
        postTitle[x] = postTitle[y];
        postTitle[y] = a;
        var a = postDate[x];
        postDate[x] = postDate[y];
        postDate[y] = a;
        var a = postUrl[x];
        postUrl[x] = postUrl[y];
        postUrl[y] = a;
        var a = postLabels[x];
        postLabels[x] = postLabels[y];
        postLabels[y] = a;
        var a = postMp3[x];
        postMp3[x] = postMp3[y];
        postMp3[y] = a;
        var a = postBaru[x];
        postBaru[x] = postBaru[y];
        postBaru[y] = a
    }
    for (var i = 0; i < postTitle.length - 1; i++) {
        for (var j = i + 1; j < postTitle.length; j++) {
            if (b == "titleasc") {
                if (postTitle[i] > postTitle[j]) {
                    swapPosts(i, j)
                }
            }
            if (b == "titledesc") {
                if (postTitle[i] < postTitle[j]) {
                    swapPosts(i, j)
                }
            }
            if (b == "dateoldest") {
                if (postDate[i] > postDate[j]) {
                    swapPosts(i, j)
                }
            }
            if (b == "datenewest") {
                if (postDate[i] < postDate[j]) {
                    swapPosts(i, j)
                }
            }
            if (b == "orderlabel") {
                if (postLabels[i] > postLabels[j]) {
                    swapPosts(i, j)
                }
            }
        }
    }
}

function sortlabel() {
    sortBy = "orderlabel";
    sortPosts(sortBy);
    var j = 0;
    var i = 0;
    while (i < postTitle.length) {
        temp1 = postLabels[i];
        firsti = j;
        do {
            j = j + 1
        } while (postLabels[j] == temp1);
        i = j;
        sortPosts2(firsti, j);
        if (i > postTitle.length) break
    }
}

function sortPosts2(b, c) {
    function swapPosts2(x, y) {
        var a = postTitle[x];
        postTitle[x] = postTitle[y];
        postTitle[y] = a;
        var a = postDate[x];
        postDate[x] = postDate[y];
        postDate[y] = a;
        var a = postUrl[x];
        postUrl[x] = postUrl[y];
        postUrl[y] = a;
        var a = postLabels[x];
        postLabels[x] = postLabels[y];
        postLabels[y] = a;
        var a = postMp3[x];
        postMp3[x] = postMp3[y];
        postMp3[y] = a;
        var a = postBaru[x];
        postBaru[x] = postBaru[y];
        postBaru[y] = a
    }
    for (var i = b; i < c - 1; i++) {
        for (var j = i + 1; j < c; j++) {
            if (postTitle[i] > postTitle[j]) {
                swapPosts2(i, j)
            }
        }
    }
}

function displayToc(a) {
    var b = 0;
    var c = '';
    var d = 'Judul Artikel';
    var e = 'Klik untuk sortir berdasarkan judul';
    var f = 'Tanggal';
    var g = 'Klik untuk Sortir bedasarkan tanggal';
    var h = 'Kategori';
    var j = '';
    if (sortBy == "titleasc") {
        e += ' (descending)';
        g += ' (newest first)'
    }
    if (sortBy == "titledesc") {
        e += ' (ascending)';
        g += ' (newest first)'
    }
    if (sortBy == "dateoldest") {
        e += ' (ascending)';
        g += ' (newest first)'
    }
    if (sortBy == "datenewest") {
        e += ' (ascending)';
        g += ' (oldest first)'
    }
    if (postFilter != '') {
        j = 'Klik untuk menampilkan semua'
    }
    c += '<table>';
    c += '<tr>';
    c += '<td class="toc-header-col1">';
    c += '<a href="javascript:toggleTitleSort();" title="' + e + '">' + d + '</a>';
    c += '</td>';
    c += '<td class="toc-header-col2">';
    c += '<a href="javascript:toggleDateSort();" title="' + g + '">' + f + '</a>';
    c += '</td>';
    c += '<td class="toc-header-col3">';
    c += '<a href="javascript:allPosts();" title="' + j + '">' + h + '</a>';
    c += '</td>';
    c += '<td class="toc-header-col4">';
    c += 'Download MP3';
    c += '</td>';
    c += '</tr>';
    for (var i = 0; i < postTitle.length; i++) {
        if (a == '') {
            c += '<tr><td class="toc-entry-col1"><a href="' + postUrl[i] + '">' + postTitle[i] + '</a></td><td class="toc-entry-col2">' + postDate[i] + '</td><td class="toc-entry-col3">' + postLabels[i] + '</td><td class="toc-entry-col4">' + '<a href="' + postMp3[i] + '">' + 'Download' + '</a>' + '</td></tr>';
            b++
        } else {
            z = postLabels[i].lastIndexOf(a);
            if (z != -1) {
                c += '<tr><td class="toc-entry-col1"><a href="' + postUrl[i] + '">' + postTitle[i] + '</a></td><td class="toc-entry-col2">' + postDate[i] + '</td><td class="toc-entry-col3">' + postLabels[i] + '</td><td class="toc-entry-col4">' + '<a href="' + postMp3[i] + '">' + 'Download' + '</a>' + '</td></tr>';
                b++
            }
        }
    }
    c += '</table>';
    if (b == postTitle.length) {
        var k = '<span class="toc-note">Menampilkan Semua ' + postTitle.length + ' Artikel<br/></span>'
    } else {
        var k = '<span class="toc-note">Menampilkan ' + b + ' artikel dengan kategori \'';
        k += postFilter + '\' dari ' + postTitle.length + ' Total Artikel<br/></span>'
    }
    var l = document.getElementById("toc");
    l.innerHTML = k + c
}

function displayToc2() {
    var j = 0;
    var i = 0;
    document.write('<div id="daftar-isi">');
    while (i < postTitle.length) {
        temp1 = postLabels[i];
        document.write('<div class="sublabel">');
        document.write('<div class="judul-label">' + temp1 + '</div>');
        document.write('<div class="judul-list"><ol>');
        firsti = j;
        var a = 'odd';
        do {
            if (a == 'odd') {
                document.write('<li class="data-list list-ganjil">');
                a = 'even'
            } else {
                document.write('<li class="data-list list-genap">');
                a = 'odd'
            }
            document.write('<a href="' + postUrl[j] + '">' + postTitle[j] + '</a>');
            if (postBaru[j] == true) {
                document.write(' - <strong><em><span style="color: rgb(255, 0, 0);">New !!</span> </em></strong>')
            };
            document.write('</li>');
            j = j + 1
        } while (postLabels[j] == temp1);
        i = j;
        document.write('</ol></div></div>');
        sortPosts2(firsti, j);
        if (i > postTitle.length) break
    }
    document.write('</div>')
}

function toggleTitleSort() {
    if (sortBy == "titleasc") {
        sortBy = "titledesc"
    } else {
        sortBy = "titleasc"
    }
    sortPosts(sortBy);
    displayToc(postFilter)
}

function toggleDateSort() {
    if (sortBy == "datenewest") {
        sortBy = "dateoldest"
    } else {
        sortBy = "datenewest"
    }
    sortPosts(sortBy);
    displayToc(postFilter)
}

function showToc() {
    if (tocLoaded) {
        displayToc(postFilter);
        var a = document.getElementById("toclink")
    } else {
        alert("Just wait... TOC is loading")
    }
}

function hideToc() {
    var a = document.getElementById("toc");
    a.innerHTML = '';
    var b = document.getElementById("toclink");
    b.innerHTML = '<a href="#" onclick="scroll(0,0); showToc(); Effect.toggle(' + "'toc-result','blind');" + '">¡í Menampilkan Daftar Isi</a> <img src="http://radiorodja.googlepages.com/new_1.gif"/>'
}

function looptemp2() {
    for (var i = 0; i < numberfeed; i++) {
        document.write('<br>');
        document.write('Post Link		  : ' + '<a href="' + postUrl[i] + '">' + postTitle[i] + '</a>' + '<br>');
        document.write('Download mp3  : ' + '<a href="' + postMp3[i] + '">' + postTitle[i] + '</a>' + '<br>');
        document.write('<br>')
    }
}