import React from "react"
import { ListIconModel } from "../models/ListIconModel"

const ListIcon = ({ name, webUrl, icomoonClass }: ListIconModel) => {
  return (
    <li>
      <a
        href={webUrl}
        className="wrapper__container__icons__link"
        target="_blank"
        title={name}
        rel="noopener"
        aria-label="TailwindCSS"
      >
        <i
          role="img"
          className={`${icomoonClass} wrapper__container__icons__icon`}
        >
          <p className="wrapper__container__icons__icon__text">{name}</p>
        </i>
      </a>
    </li>
  )
}

export default ListIcon
