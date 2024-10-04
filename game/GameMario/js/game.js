setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"coverku3.png",
	startBtn:"tomlogin.png",
	cover:"coverkedua.png",
	playBtn:"playbtn.png",
	maxBtn:"zoombtn.png",
	minBtn:"minbtnku.png"	,
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall:"Fall.png",
	hit:"Hit.png",
	tileset:"terrain.png",
	bg:"My project-2.jpg",
	item1:"Melon.png",
	item2:"Cherries.png",
	musuh1Idle:"enemy1Idle.png",
	musuh1Run:"enemy1Run.png",
	musuh1Hit:"enemy1Hit.png",
	bendera:"Flag.png"
}
//file suara yang dipakai dalam game
var suara = {
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen(){	
	hapusLayar("black");
	tampilkanGambar(dataGambar.logo, 600, 250);
	var startBtn = tombol(dataGambar.startBtn, 600, 350);
	if (tekan(startBtn)){
		jalankan(halamanCover);
	}
}
function halamanCover(){
	hapusLayar("#67d2d6");
	gambarFull(dataGambar.cover);
	var playBtn = tombol(dataGambar.playBtn, 1100, 500);
	if (tekan(playBtn)){
		setAwal();
		jalankan(gameLoop);
	}	
	resizeBtn(1150,50);
}

function setAwal(){
	game.hero = setSprite(dataGambar.idle,32,32);
	game.hero.animDiam = dataGambar.idle;
	game.hero.animJalan = dataGambar.run;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	game.skalaSprite = 2;
	setPlatform(this["map_"+game.level], dataGambar.tileset,
 32, game.hero);
	game.gameOver = ulangiPermainan;

	//set item
setPlatformItem(1, dataGambar.item1);
setPlatformItem(2, dataGambar.item2);

//set musuh
	var musuh1 = {};
	musuh1.animDiam = dataGambar.musuh1Idle;
	musuh1.animJalan = dataGambar.musuh1Run;
	musuh1.animMati = dataGambar.musuh1Hit;
	setPlatformEnemy(1, musuh1);

	//set trigger
setPlatformTrigger(1, dataGambar.bendera);
}

function ulangiPermainan(){
	game.aktif = true;
	setAwal();
	jalankan(gameLoop);
	}
	

function gameLoop(){
	hapusLayar("#9c9695");
	hapusLayar("#9c9695");
 if (game.kanan){
gerakLevel(game.hero, 3, 0);
}else if (game.kiri){
gerakLevel(game.hero, -3, 0);
}
if (game.atas){
gerakLevel(game.hero, 0, -10);
}
latar(dataGambar.bg, 0, 0.5);
buatLevel();

cekItem();
teks(game.score, 40, 60, "Calibri-bold-20pt-left-biru");
}

function cekItem(){
	if (game.itemID > 0){
	tambahScore(10*game.itemID);
	game.itemID = 0;
	}

	if (game.musuhID != 0){
		tambahScore(25);
		game.musuhID = 0;
		}
		
		if (game.triggerID == 1){
			game.triggerID = 0;
			game.aktif = false;
			game.level++;
			setTimeout(ulangiPermainan, 2000);
			}
		}			
	

	
