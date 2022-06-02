let sonicSettings = {

    width: 100,
    height: 100,

    stepsPerFrame: 1,
    trailLength: 1,
    pointDistance: .05,

    strokeColor: '#005bc2',

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