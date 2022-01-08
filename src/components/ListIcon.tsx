import React from "react"
import { ListIconModel } from "../models/ListIconModel"

const ListIcon = ({ name, webUrl, icomoonClass }: ListIconModel) => {
  return (
    <li>
      <a
        href={webUrl}
        target="_blank"
        title={name}
        rel="noopener"
        aria-label="TailwindCSS"
      >
        <i role="img" className={icomoonClass}>
          <p>{name}</p>
        </i>
      </a>
    </li>
  )
}

export default ListIcon
