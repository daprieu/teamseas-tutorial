const trashContainer = document.querySelector('.trash-container')
const moneyElem = document.querySelector('.money')
const currencyFormatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD", 
    maximumFractionDigits: 0
})

const trashFormatter = new Intl.NumberFormat("en-us", {
    minimumIntegerDigits: 8,
    maximumFractionDigits: 0,
    useGrouping: false
})
const MAX_MONEY_RAISED = 30000000

const setupTrash = async () => {
    const amountRaised = await fetch("https://tscache.com/donation_total.json")
    .then(res => res.json())
    .then(data => data.count)
    moneyElem.innerText = currencyFormatter.format(amountRaised)

    const amountLeft = Math.max(MAX_MONEY_RAISED - amountRaised, 0)
    const stringifiedAmount=  trashFormatter.format(amountLeft)
    const trashAmount = {
        xxlTrash:{
            amount: parseInt(`${stringifiedAmount[0]}${stringifiedAmount[1]}`),
            icon: "bag"
        },
        xlTrash:{
            amount: parseInt(`${stringifiedAmount[2]}`),
            icon: "takeout"
        },
        lTrash:{
            amount: parseInt(`${stringifiedAmount[3]}`),
            icon: "electronics"
        },
        mTrash:{
            amount: parseInt(`${stringifiedAmount[4]}`),
            icon: "phone"
        },
        sTrash:{
            amount: parseInt(`${stringifiedAmount[5]}`),
            icon: "cigarettes"
        },
        xsTrash:{
            amount: parseInt(`${stringifiedAmount[6]}`),
            icon: "stringtrash"
        },
    }
    Object.values(trashAmount).forEach(({amount, icon}) => {
        for (let i = 0; i < amount; i++)
        createTrash(icon)
    })
}

const createTrash = (icon) => {
    const img = document.createElement("img")
    const top = randomNumberBetween(0, 50)
    const size = top / 4 + 1
    img.classList.add("trash")
    img.src = `/imgs/${icon}.svg`
    img.style.top = `${top}vh`
    img.style.left = `${randomNumberBetween(0, 100)}vw`
    img.style.height = `${size}vmin`
    img.style.width = `${size}vmin`
    img.style.setProperty("--rotation", `${randomNumberBetween(-38, 38)}deg`)
    trashContainer.appendChild(img)
}

const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

setupTrash()