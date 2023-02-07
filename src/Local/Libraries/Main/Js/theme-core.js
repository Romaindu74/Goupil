const background = async()=>{
    var T = getCookie('Theme'), S;
    if (T == 'i') {
        var S = `background: url("${location.origin}/Libraries/User/index/api/Background.php?t=i&id=${me.Id}");background-position: center;background-size: cover;background-repeat: no-repeat;background-attachment: fixed;`;
    } else {
        var R = await send(prepare_request(`${location.origin}/Libraries/User/index/api/Background.php`, {
            t: "c",
            id: me.Id
        }));
        if (R.c) {
            var S = `background: ${R.c}`;
        } else {
            var S = `background: #fff`;
        }
    }
    if (S) {
        document.body.style = S;
    }
};

(function index() {
    if (me)
        background();
    self.modules.set('Theme-Core.js', true);
})();