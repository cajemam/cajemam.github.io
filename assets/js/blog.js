var docTitle = document.title;

var sonicSettings = {

    width: 100,
    height: 100,

    stepsPerFrame: 1,
    trailLength: 1,
    pointDistance: .05,

    strokeColor: '#000000',

    fps: 20,

    setup: function() {
        this._.lineWidth = 4;
    },
    step: function(point, index) {

        var cx = this.padding + 50,
            cy = this.padding + 50,
            _ = this._,
            angle = (Math.PI/180) * (point.progress * 360),
            innerRadius = index === 1 ? 10 : 25;

        _.beginPath();
        _.moveTo(point.x, point.y);
        _.lineTo(
            (Math.cos(angle) * innerRadius) + cx,
            (Math.sin(angle) * innerRadius) + cy
        );
        _.closePath();
        _.stroke();

    },
    path: [
        ['arc', 50, 50, 40, 0, 360]
    ]
};
a = new Sonic(sonicSettings);
document.body.querySelector('.blog-posts').append(a.canvas);
a.play();

$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxWNyo-R9PIx4CkIRekDoROlZXM8fkeM2C5BmGj_s79yU6MZPYNIam0cwtWa2vr1km80A/exec?action=get_all_articles',
    type: 'get',
    dataType: 'json',
    success: function(returnData){
        let data = (returnData);
        if (data.status == 'success'){
            let dd = data.data;
            let bdy = document.body.querySelector('.blog-posts');
            bdy.innerHTML = '';
            for (let d in dd){
                let bd = document.createElement('div');
                bd.className = 'blog-posts-post-box';
                let bdd = document.createElement('div');
                bdd.className = "blog-posts-post";
                bdd.setAttribute('id', dd[d].id);
                let bdtitle = document.createElement('div');
                bdtitle.className = 'title';
                bdtitle.innerHTML = dd[d].title;
                let bdimg = document.createElement('div');
                bdimg.innerHTML = '<img src="'+dd[d].preview+'"></img>';
                bdd.append(bdimg);
                bdd.append(bdtitle);
                bd.append(bdd);
                bdy.append(bd);
                bdd.onclick = function(){
                    document.location.href = '#viewPost/'+dd[d].id;
                    viewPost(document.location.href.split('#viewPost/')[1]);
                }
            }
        }else{
            document.body.querySelector('.blog-posts').innerText = data.msg;
        }
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log('Error - ' + errorMessage);
    }
});

const viewPost = function(id){
    try{
        document.body.querySelector('blog-view').remove();
    }catch{
        console.log('Everything good, all clear.');
    }
    let postViewArea = document.createElement('div');
    postViewArea.className = 'blog-view';
    let postViewAreaInto = document.createElement('div');
    postViewAreaInto.className = 'blog-view-into';
    let closebtn = document.createElement('div');
    closebtn.className = 'blog-into-close';
    closebtn.innerHTML = '<img src="assets/images/arrow-back.png">';
    closebtn.onclick = function(){
        document.querySelector('.blog-view').remove();
        document.location.href = '#';
        document.title = docTitle;
        this.remove();
    };
    a = new Sonic(sonicSettings);
    postViewAreaInto.append(a.canvas);
    postViewArea.append(closebtn);
    postViewArea.append(postViewAreaInto);
    document.body.append(postViewArea);
    a.play();
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxWNyo-R9PIx4CkIRekDoROlZXM8fkeM2C5BmGj_s79yU6MZPYNIam0cwtWa2vr1km80A/exec?action=get_article_info&id='+encodeURIComponent(id),
        type: 'get',
        dataType: 'json',
        success: function(returnData){
            let data = (returnData);
            if (data.status == 'success'){
                postViewAreaInto.innerHTML = '';
                let docImage = document.createElement('div');
                docImage.className = 'blog-view-image';
                let docTitle = document.createElement('div');
                docTitle.className = 'blog-view-title';
                let docContent = document.createElement('div');
                docContent.className = 'blog-view-content';
                docImage.innerHTML = '<img src="'+data.data.preview+'"></img>';
                docTitle.innerHTML = data.data.title;
                document.title = data.data.title;
                docContent.innerHTML = data.data.html;
                postViewAreaInto.append(docImage);
                postViewAreaInto.append(docTitle);
                postViewAreaInto.append(docContent);
            }else{
                postViewAreaInto.innerText = data.msg;
            }
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });
}

window.onload = function(){
    if (document.location.href.split('#viewPost/').length > 1){
        viewPost(document.location.href.split('#viewPost/')[1]);
    }
}