










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