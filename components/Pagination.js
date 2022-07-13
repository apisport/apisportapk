import React from 'react'
//@ts-check
import { useState, useEffect } from 'react'

export default function Pagination({ pages, setCurrentPage }) {

    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    const [currentButton, setCurrentButton] = useState(1)
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

    useEffect(() => {
        let tempNumberOfPages = [...numberOfPages]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (currentButton >= 1 && currentButton <= 3 && tempNumberOfPages.length >= 7) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }

        else if (currentButton >= 1 && currentButton <= 7 && tempNumberOfPages.length < 7) {
            tempNumberOfPages = [...numberOfPages]
        }

        else if (currentButton === 4) {
            const sliced = numberOfPages.slice(0, 5)
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }

        else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length])
        }

        else if (currentButton > numberOfPages.length - 3) {
            const sliced = numberOfPages.slice(numberOfPages.length - 4)
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        }

        else if (currentButton.toString() === "...") {
            setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
        }

        else if (currentButton.toString() === dotsRight) {
            setCurrentButton(arrOfCurrButtons[3] + 2)
        }

        else if (currentButton.toString() === dotsLeft) {
            setCurrentButton(arrOfCurrButtons[3] - 2)
        }


        setArrOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentButton)
    }, [currentButton, pages, setCurrentPage])

    return (
        <div>
            <div className="">
                <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                    <ul className="pagination p-1">
                        <li className="page-item">
                            <a className="page-link"
                                onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
                                aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        {arrOfCurrButtons.map((page, index) => {
                            return (
                                <li
                                    className={currentButton === page && 'page-item active'}
                                    key={index}
                                    onClick={() => setCurrentButton(page)}>
                                    <a className="page-link" >{page}</a>
                                </li>
                            )
                        })}
                        <li className="page-item">
                            <a className="page-link"
                                onClick={() => setCurrentButton((prev) => prev === numberOfPages.length ? prev : prev + 1)}
                                aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}
