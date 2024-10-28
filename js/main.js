/*

/seller를 제외한 모든 응답 앤드 포인트 수정해야 함

*/

//루트중 nullapi는 기능이 구현되 있지 않은 루트 이다

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cheerio = require('cheerio');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const app = express();

//프로그램 오류로 주석 처리 구동 완료 확인ㄴ

const PORT = 80;

let page; //페이지정보를 보내는 데이터 저장

//데이터 저장 경로
const data_base = path.join("D:","softoasis");
const page_loot = path.join(__dirname,"/../page");
const admin_data = path.join(data_base,"admin");

//html 정보가 저장된 루트
const seller_page_loot = path.join(page_loot,"seller","page");
const seller_pagetaplate_loot = path.join(page_loot,"seller","tamplate");

const meta_page_loot = path.join(page_loot,"meta","page");
const meta_pagetamplate_loot = path.join(page_loot,"meta","tamplate");

const industry_page_loot = path.join(page_loot,"industry","page");
const industry_pagetamplate_loot = path.join(page_loot,"industry","tamplate");

const admin_page_loot = path.join(page_loot,"admin","page");
const admin_pagetamplate_loot = path.join(page_loot,"admin","tamplate");

const versionfilePath = path.join(__dirname,"/../version","page.json");

let pagever = JSON.parse(fs.readFileSync(path.join(__dirname, "/../version", "page.json"), 'utf-8'));
console.log(pagever);
const version = ReadFile(versionfilePath);

// 이미지 저장 경로 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 장바구니 초기화
let products = [];
let cart = [];

// uploads 디렉토리를 static 파일로 제공
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//어드민ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.get('/admin', (req, res) => {
    let page ;
    let Readtamplate = path.join(admin_pagetamplate_loot,`tamplate_0_0_1.html`);
    let Readpage = path.join(admin_page_loot,"mainhome.html");

    page = applyPageToTemplate(Readtamplate,Readpage);
    

    res.send(page);
});
app.post('/adminmember', async (req, res) => {
    const { action } = req.body;
    let HR = ["developer1", "developer2", "HR", "produce"];
    const admin_member_ref = path.join(admin_data, "member");
    let resdata = {
        "developer1": "",
        "developer2": "",
        "HR": "",
        "produce": ""
    };

    // 비동기 처리를 위해 async/await 사용
    for (let i = 0; i < HR.length; i++) {
        try {
            const inputdata = await ReadFile(path.join(admin_member_ref, `${HR[i]}.json`));
            resdata[HR[i]] = JSON.parse(inputdata);
        } catch (err) {
            console.error(`Error reading file for ${HR[i]}:`, err);
        }
    }

    console.log(resdata);
    res.status(200).json({ "resdata": resdata });
});


//소프트오아시스 페이지ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.get('/', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(industry_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(industry_page_loot,"mainhome.html");
    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});
//소프트오아시스 기업 소개 페이지
app.get('/industryinfo', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(industry_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(industry_page_loot,"mainhome.html");
    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});
//소프트오아시스 프로젝트 페이지
app.get('/projectinfo', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(industry_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(industry_page_loot,"projectinfo.html");
    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});
app.get('/developerHR', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(industry_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(industry_page_loot,"developerHR.html");
    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});
app.get('/partnerindustry', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(industry_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(industry_page_loot,"partnerindustry.html");
    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});
app.get('/teamhuman', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(industry_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(industry_page_loot,"teamhuman.html");
    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});

//메타커머스E 페이지ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.get('/mataCommerce', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(meta_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(meta_page_loot,"mainhome.html");
    page = applyPageToTemplate(Readtamplate,Readpage);
    
    res.send(page);
});
app.get('/mataCommerceLogin', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(meta_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(meta_page_loot,"login.html");
    page = applyPageToTemplate(Readtamplate,Readpage);
    
    res.send(page);
});
app.get('/mataCommerceRegister', (req, res) => { //기업 소개 페이지
    let Readtamplate = path.join(meta_pagetamplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(meta_page_loot,"register.html");
    page = applyPageToTemplate(Readtamplate,Readpage);
    
    res.send(page);
});
app.post('/userinfo', async (req, res) => {
    const { id, password, } = req.body;
    try {
        //const token = await userlogin(email, password);  // userlogin 함수가 반환하는 Promise를 기다립니다.
        //console.log(token);
        res.status(200).json({ token: "회원가입 완료" });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });  // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    }
});

//판매자 페이지ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//판매자 기본 메인 페이지
app.get('/seller', (req, res) => {
    const tk = req.query.tk;

    let Readtamplate = path.join(seller_pagetaplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(seller_page_loot,"mainhome.html");
    let Readpage_tk = path.join(seller_page_loot,"sellerintro.html");

    if(tk != null){
        page = applyPageToTemplate(Readtamplate,Readpage);
        res.send(page);
    }
    else{//토큰이 없는경우
        page = readfile(Readpage_tk);
        res.send(page);
    }
    
});
//판매자 로그인 페이지
app.get('/sellerlogin', (req, res) => {
    let Readtamplate = path.join(seller_pagetaplate_loot,"tamplate_0_0_1.html");
    let Readpage = path.join(seller_page_loot,"mainhome.html");
    
    page = applyPageToTemplate(Readtamplate,Readpage);
    res.send(page);
});
app.get('/sellerchat', (req, res) => {
    let page ;
    let Readtamplate = path.join(page_loot,"seller","tamplate",`tamplate_0_0_1.html`);
    let Readpage = path.join(page_loot,"seller","page","review_chat.html");

    page = applyPageToTemplate(Readtamplate,Readpage);

    res.send(page);
});
app.get('/productfind', (req, res) => {
    let page ;
    let Readtamplate = path.join(page_loot,"seller","tamplate",`tamplate_0_0_1.html`);
    let Readpage = path.join(page_loot,"seller","page","review_chat.html");

    page = applyPageToTemplate(Readtamplate,Readpage);
    res.send(page);
});
// 상품 등록 폼 페이지 seller
app.get('/productregister', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <title>상품 등록</title>
            <style>
                body {
                    background-color: #f8f9fa;
                }
                .container {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>상품 등록하기</h1>
                <form action="/api/products" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="name">이름:</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="description">설명:</label>
                        <input type="text" name="description" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="price">가격:</label>
                        <input type="number" name="price" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="image">이미지:</label>
                        <input type="file" name="image" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">등록</button>
                </form>
                <p><a href="/">홈으로</a></p>
            </div>
        </body>
        </html>
    `);
});
// 상품 등록 엔드포인트 seller
app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || !price || !req.file) {
        return res.status(400).json({ message: '이름, 설명, 가격, 이미지를 모두 입력해주세요.' });
    }

    const newProduct = {
        id: products.length + 1,
        이름: name,
        설명: description,
        가격: parseFloat(price),
        이미지: `/uploads/${req.file.filename}`,
    };
    products.push(newProduct);

    res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <title>상품 등록 완료</title>
            <style>
                body {
                    background-color: #f8f9fa;
                }
                .container {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="text-center">상품 등록 완료</h1>
                <div class="alert alert-success" role="alert">
                    상품이 성공적으로 등록되었습니다.
                </div>
                <div class="card mb-4 shadow-sm">
                    <img src="${newProduct.이미지}" alt="${newProduct.이름}" class="card-img-top" style="max-width: 200px;">
                    <div class="card-body">
                        <h5 class="card-title">${newProduct.이름}</h5>
                        <p class="card-text">${newProduct.설명}</p>
                        <p class="card-text">가격: ${newProduct.가격}원</p>
                    </div>
                </div>
                <p><a href="/api/products" class="btn btn-primary">상품 목록으로 돌아가기</a></p>
                <p><a href="/register" class="btn btn-secondary">상품 등록하기</a></p>
                <p><a href="/" class="btn btn-link">홈으로</a></p>
            </div>
        </body>
        </html>
    `);
});
// 상품 목록 조회 엔드포인트 seller
app.get('/api/products', (req, res) => {
    const productList = products.map(product => `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img src="${product.이미지}" class="card-img-top" alt="${product.이름}">
                <div class="card-body">
                    <h5 class="card-title">${product.이름}</h5>
                    <p class="card-text">${product.설명}</p>
                    <p class="card-text">가격: ${product.가격}원</p>
                    <form action="/api/cart/add" method="POST" style="display:inline;">
                        <input type="hidden" name="productId" value="${product.id}">
                        <button type="submit" class="btn btn-success">장바구니에 추가</button>
                    </form>
                </div>
            </div>
        </div>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <title>상품 목록</title>
            <style>
                body {
                    background-color: #f8f9fa;
                }
                .container {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="text-center">상품 목록</h1>
                <div class="row">
                    ${productList || '<p>등록된 상품이 없습니다.</p>'}
                </div>
                <p><a href="/">홈으로</a></p>
            </div>
        </body>
        </html>
    `);
});
// 장바구니에 상품 추가 meta
app.post('/api/cart/add', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id == productId);

    if (product) {
        cart.push(product);
        res.send(`
            <h1>장바구니에 추가되었습니다!</h1>
            <p>${product.이름}이(가) 장바구니에 추가되었습니다.</p>
            <p><a href="/api/products">상품 목록으로 돌아가기</a></p>
            <p><a href="/">홈으로</a></p>
        `);
    } else {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
});
// 장바구니 조회 엔드포인트 meta
app.get('/cart', (req, res) => {
    if (cart.length === 0) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
                <title>장바구니</title>
                <style>
                    body {
                        background-color: #f8f9fa;
                    }
                    .container {
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>장바구니가 비어 있습니다.</h1>
                    <p><a href="/">홈으로</a></p>
                </div>
            </body>
            </html>
        `);
    }

    const cartList = cart.map(product => `
        <li class="list-group-item">
            <strong>${product.이름}</strong><br>
            설명: ${product.설명}<br>
            가격: ${product.가격}원<br>
            <img src="${product.이미지}" alt="${product.이름}" style="max-width: 100px;">
        </li>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <title>장바구니</title>
            <style>
                body {
                    background-color: #f8f9fa;
                }
                .container {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>장바구니</h1>
                <ul class="list-group">
                    ${cartList}
                </ul>
                <p><a href="/">홈으로</a></p>
            </div>
        </body>
        </html>
    `);
});
// 상품 등록 폼 페이지 
app.get('/register', (req, res) => {
    res.send(`
        <h1>상품 등록하기</h1>
        <form action="/api/products" method="POST" enctype="multipart/form-data">
            <label for="name">이름:</label>
            <input type="text" name="name" required><br>
            <label for="description">설명:</label>
            <input type="text" name="description" required><br>
            <label for="price">가격:</label>
            <input type="number" name="price" required><br>
            <label for="image">이미지:</label>
            <input type="file" name="image" required><br>
            <button type="submit">등록</button>
        </form>
        <p><a href="/">홈으로</a></p>
    `);
});
//판매자센터ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/chat', (req, res) => {
    const { action,fromuser,touser,chat } = req.body;
    if(action=="start_storechat"){
        chat(action,fromuser,touser,chat);
    }
    if(action=="plus_storechat"){
        pluschat(action,fromuser,touser,chat);
    }
});




//토탈 기능(모든 홈페이지적용 가능한 api및 기능)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/login_pass', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userlogin(email, password);  // userlogin 함수가 반환하는 Promise를 기다립니다.
        console.log(token);
        res.status(200).json({ token: token });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });  // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    }
});
app.post('/join_pass', async (req, res) => {
    const { id, password } = req.body;
    console.log(id+password);

    try {
        //const token = await userlogin(email, password);  // userlogin 함수가 반환하는 Promise를 기다립니다.
        //console.log(token);
        res.status(200).json({ token: "회원가입 완료" });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });  // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    }
});
app.post('/nullapi', async (req, res) => {
    const { id, password } = req.body;
    console.log(id+password);

    try {
        //const token = await userlogin(email, password);  // userlogin 함수가 반환하는 Promise를 기다립니다.
        //console.log(token);
        res.status(200).json({ token: "회원가입 완료" });  // 토큰을 응답으로 보냅니다.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });  // 에러가 발생하면 에러 메시지를 응답으로 보냅니다.
    }
});


//함수ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function applyPageToTemplate(templatePath, pagePath) {
    let template = readfile(templatePath);
    let pageContent = readfile(pagePath);
    const mainPageRegex = /<div id="mainpage"><\/div>/;
    return template.replace(mainPageRegex, `<div id="mainpage">${pageContent}</div>`);
}
function readfile(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8');
}
function chat(action,fromuser,touser,chat){
    // 받아야 하는 데이터 : 액션 이름(action). 유저 아이디(fromuser), 챗 대상 아이디 (touser), 
    // 불러올 데이터 : 시간(chattime), 
    //액션 종류 : 스토어챗, 메타커머스쳇,
    if(action=="start_storechat"){ //스토어 문의
        //액션 변수 
        //1.시간과 랜덤수를 합하여 채팅의 고유 번호를 매김
        let time=get_time();
        let ranstr = generateRandomString(20);
        let chat_number = time+ ranstr ;
        create_storechat(path.join(data_base,"database","chat","store"),chat_number,fromuser,touser);
        
    }
    
    if(action=="plus_storechat"){
        pluschat(chat_number,fromuser,touser,chat);
    }
}
function pluschat(chat_number,fromuser,touser,chat){
    
    const filePath = path.join(data_base,"database","chat","store",`${chat_number}.json`);
    let username = findusername(userid);
    let chatjson = { 
        username : chat 
    }
    let chatinfo = ReadFile(filePath);
    console.log(chatinfo,typeof(chatinfo));
    
    
}
function findusername(userid){
    //userid hang05312
    // 데이터베이스 루트 경로 (data_base가 이미 설정된 변수라고 가정)
    const filePath = path.join(data_base, "database", "user", `${userid}.json`);

    const Username = ReadFile(filePath);
    console.log(Username);
    return Username;
}
function create_storechat(Path,chat_number,fromuser,touser){
    const filePath = path.join(Path, `${chat_number}.json`);
    const initialData = {
        "user" : [
            fromuser , touser
        ],
        "chat" : [
            
        ]
    };
    // 파일에 JSON 데이터를 기록
    fs.writeFile(filePath, JSON.stringify(initialData, null, 2), (err) => {
        if (err) {
            console.error('Error creating chat file:', err);
        } else {
            console.log(`File ${chat_number}.json created successfully at ${Path}`);
        }
    });
}
function get_time(){
    const currentDate = new Date();
    console.log(currentDate);  // 전체 날짜 및 시간
    return currentDate;
}
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  // 사용할 문자들
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
function ReadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err); // 에러 발생 시 reject
                return;
            }
            resolve(data); // 성공 시 resolve
        });
    });
}

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

/*   기존 루트 "/"
const productList = products.map(product => `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img src="${product.이미지}" class="card-img-top" alt="${product.이름}">
            <div class="card-body">
                <h5 class="card-title">${product.이름}</h5>
                <p class="card-text">${product.설명}</p>
                <p class="card-text">가격: ${product.가격}원</p>
                <form action="/api/cart/add" method="POST" style="display:inline;">
                    <input type="hidden" name="productId" value="${product.id}">
                    <button type="submit" class="btn btn-success">장바구니에 추가</button>
                </form>
            </div>
        </div>
    </div>
`).join('');
*/
