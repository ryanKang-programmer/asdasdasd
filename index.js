window.onload = () => {
    /**
     * Making navigation menus
     */

    window.addEventListener('resize', function(event) {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, true);
    
    const nav = document.getElementById('navigation');

    fetch('./data/navigation_menu.json')
    .then(res => res.json())
    .then(data => {
        const {navigation_menu, logo_url} = data;
        const navigation_divs = navigation_menu.reduce((prev, cur, idx) => {
            if (cur.hide) {
                return prev;
            } else {
                return prev + `
                <div class="navigation-item" 
                    onclick=${cur.id !== undefined && cur.id !==null && cur.id === 'resume' ? "resume()" : `"selectNav(${idx}, this)"`}>
                    ${cur.name}
                </div>`;
            }
        }, '')

        nav.innerHTML = navigation_divs;
        selectNav(0, document.querySelector('#navigation').children[0]);

        const logoLink = document.querySelector('#logo-link');
        logoLink.href = logo_url;
    })
    .catch(err => console.log(err));
}

function selectNav(idx, t) {
    const navis = document.getElementsByClassName('navigation-item');

    for (let i = 0; i < navis.length; i++) {
        const cur = navis[i];
        cur.classList.remove('selected');
    }

    t.classList.add('selected')

    const left = document.getElementById('left');

    if (idx !== 0) {
        //hide picture
        left.style.flex = 0;
    } else {
        //show picture
        left.style.flex = 1;
    }

    if (window.outerWidth < 900) {
        closeMobileNavi();
    }

    switch (idx) {
        case 0:
            home();
            break;
        case 1:
            publications();
            break;
        case 2:
            scholarships();
            break;
        case 3:
            awards();
            break;
        case 4:
            volunteering();
            break;
        case 5:
            skills();
            break;
        case 6:
            gallery();
            break;
        case 7:
            contact();
            break;
        case 8:
            break;
        default:
            console.log('default')
    }
}

function home() {
    /**
     * Making home contents
     */
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/home.json')
    .then(res => res.json())
    .then(data => {
        const {about, career} = data;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex:1; padding: 0 1rem">
                <div style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    <h2>
                        About
                    </h2>
                </div>
                <div style="padding: .5rem">
                    <span id="about"></span><span class="blink">|</span>
                </div>
            </div>
            <div style="flex: 1; position: relative; padding: 0 1rem 1rem 1rem;">
                <div style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    <h2>
                        Career
                    </h2>
                </div>
                <ul>
                    ${career.reduce((prev, curr) => prev + 
                        `
                        <li class="ul-items">
                            <div style="display: flex; justify-content: space-between">
                                <div style="flex: 0.7;">
                                    <div>
                                        ${curr.content}
                                    </div>
                                    <div>
                                        ${curr.affiliation}
                                    </div>
                                </div>
                                <div style="flex: 0.3; font-weight: 700; text-align: end">
                                    ${curr.preiod}
                                </div>
                            </div>
                        </li>
                        `
                    , '')}
                </ul>
            </div>
        </div>`

        contents_ul.innerHTML = innerHTML;

        const content = about;
        const text = document.getElementById("about");
        let i = 0;

        function typing(){
            if (i < content.length) {
                let txt = content.charAt(i);
                text.innerHTML += txt;
                i++;
            } else {
                clearInterval(interval);
                const blink = document.querySelector(".blink");
                if (blink !== null && blink !== undefined) {
                    blink.textContent = "";
                    blink.classList.remove("blink")
                }
            }
        }
        
        const interval = setInterval(typing, 15)
    })
    .catch(err => console.log(err));
}

function publications() {
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/publications.json')
    .then(res => res.json())
    .then(json => {
        const {data} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    Publications
                </h2>
                <ul>
                    ${data.reduce((prev, curr) => prev + 
                        `
                        <li class="ul-items">
                            <div clas=="mobile-li">
                                <div style="flex: 0.8;">
                                    <div>
                                        ${curr.title}
                                    </div>
                                    <div style="font-style: italic;">
                                        ${curr.journal}
                                    </div>
                                </div>
                                <div style="flex: 0.2; font-weight: 700; display: flex; justify-content: end; align-items: center;">
                                        ${curr.date}
                                </div>
                            </div>
                        </li>
                        `
                    , '')}
                </ul>
            </div>
        </div>`

        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function scholarships() {
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/scholarships.json')
    .then(res => res.json())
    .then(json => {
        const {scholarships} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    Scholarships
                </h2>
                <ul>
                    ${scholarships.reduce((prev, curr) => prev + 
                        `
                        <li class="ul-items">
                            <div class="mobile-li">
                                <div style="flex: 0.8;">
                                    <div>
                                        ${curr.title}
                                    </div>
                                    <div style="font-style: italic;">
                                        ${curr.issuedBy}
                                    </div>
                                </div>
                                <div class="mobile-period">
                                        ${curr.date}
                                </div>
                            </div>
                        </li>
                        `
                    , '')}
                </ul>
            </div>
        </div>`
        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function awards() {
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/awards.json')
    .then(res => res.json())
    .then(json => {
        const {awards} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    Awards
                </h2>
                <ul>
                    ${awards.reduce((prev, curr) => prev + 
                        `
                        <li class="ul-items">
                            <div class="mobile-li">
                                <div style="flex: 1;">
                                    <div>
                                        ${curr.title}
                                    </div>
                                    <div style="font-style: italic;">
                                        ${curr.issuedBy}
                                    </div>
                                </div>
                                <div class="mobile-period">
                                        ${curr.date}
                                </div>
                            </div>
                        </li>
                        `
                    , '')}
                </ul>
            </div>
        </div>`
        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function volunteering() {
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/volunteering.json')
    .then(res => res.json())
    .then(json => {
        const {volunteering} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    Volunteering
                </h2>
                <ul>
                    ${volunteering.reduce((prev, curr) => prev + 
                        `
                        <li class="ul-items">
                            <div class="mobile-li">
                                <div style="flex: 1;">
                                    <div>
                                        ${curr.title}
                                    </div>
                                    <div style="font-style: italic;">
                                        ${curr.where}
                                    </div>
                                </div>
                                <div class="mobile-period">
                                        ${curr.priod}
                                </div>
                            </div>
                        </li>
                        `
                    , '')}
                </ul>
            </div>
        </div>`
        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function skills() {
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/skills.json')
    .then(res => res.json())
    .then(json => {
        const {skills} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    Skills
                </h2>
                <ul style="padding: 0 2rem; list-style-type: disc;">
                    ${skills.reduce((prev, curr) => prev + 
                        `
                        <li class="ul-items">
                            <div style="display: flex; justify-content: space-between">
                                <div style="flex: 1;">
                                    <div>
                                        ${curr}
                                    </div>
                                </div>
                            </div>
                        </li>
                        `
                    , '')}
                </ul>
            </div>
        </div>`
        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function contact() {
    const contents_ul = document.getElementById('contents-ul');

    fetch('./data/contact.json')
    .then(res => res.json())
    .then(json => {
        const {email, git, linkedIn, instagram, youtube} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png');">
                    Contact
                </h2>
                <ul class="contact-ul" style="">
                    ${email !== undefined && email !== "" ? `
                        <li>
                            <a href="mailto:${email}" style="display: flex; align-items: center;">
                                <i class="fas fa-envelope-square fa-3x"></i>
                                <div style="padding: 0 .5rem">${email}</div>
                            </a>
                        </li>
                    ` : ""}
                    ${git !== undefined && git !== "" ? `
                        <li>
                            <a href="${git}" target="_blank" style="display: flex; align-items: center;">
                                <i class="fab fa-github-square fa-3x"></i>
                                <div style="padding: 0 .5rem">${git}</div>
                            </a>
                        </li>
                    ` : ""}
                    ${linkedIn !== undefined && linkedIn !== "" ? `
                        <li>
                            <a href="${linkedIn}" target="_blank" style="display: flex; align-items: center;">
                                <i class="fab fa-linkedin fa-3x"></i>
                                <div style="padding: 0 .5rem">${linkedIn}</div>
                            </a>
                        </li>
                    ` : ""}
                    ${instagram !== undefined && instagram !== "" ? `
                        <li>
                            <a href="${instagram}" target="_blank" style="display: flex; align-items: center;">
                                <i class="fab fa-instagram-square fa-3x"></i>
                                <div style="padding: 0 .5rem">${instagram}</div>
                            </a>
                        </li>
                    ` : ""}
                    ${youtube !== undefined && youtube !== "" ? `
                        <li>
                            <a href="${youtube}" target="_blank" style="display: flex; align-items: center;">
                                <i class="fab fa-youtube fa-3x"></i>
                                <div style="padding: 0 .5rem">${youtube}</div>
                            </a>
                        </li>
                    ` : ""}
                </ul>
            </div>
        </div>`
        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function gallery() {
    const contents_ul = document.getElementById('contents-ul');
    
    fetch('./data/gallery.json')
    .then(res => res.json())
    .then(json => {
        const {folder_path, images_name} = json;

        const innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; position: relative; margin: 1rem">
                <h2 style="position: sticky; top: 0; background: rgb(246,248,252); background-image: url('images/textured-paper.png'); z-index: 1;">
                    Gallery
                </h2>
                <div class="body-container">
                    ${images_name.reduce((prev, curr) => prev + 
                        `
                        <div class="card" style="overflow: hidden">
                            <div style="background-image: url(${folder_path}/${curr})" class="gallery-img" onclick="showModal('${folder_path}/${curr}')">
                            </div>
                        </div>
                        `
                    , '')}
                </ul>
            </div>
        </div>`
        contents_ul.innerHTML = innerHTML;
    })
    .catch(err => console.log(err));
}

function resume() {
    fetch('./data/resume.json')
    .then(res => res.json())
    .then(json => {
        const {url} = json;
        window.open(url);
    })
    .catch(err => console.log(err));
}

function hideModal(t) {
    t.style.display = 'none'
}

function showModal(url) {
    const imgDiv = document.querySelector("#big-img");
    const imgModal = document.querySelector(".img-modal");

    imgDiv.style.backgroundImage = `url('${url}')`;
    imgModal.style.display = 'flex'
}

function openMobileNav() {
    const navi = document.querySelector('.navi-container');
    navi.style.display = "block";
}

function closeMobileNavi() {
    const navi = document.querySelector('.navi-container');
    navi.style.display = "none";
}