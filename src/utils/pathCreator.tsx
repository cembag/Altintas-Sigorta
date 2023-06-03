import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type Path = {
    name: string,
    path: string
}

export default function PathCreator() {

    const { pathname } = useLocation();

    useEffect(() => {
        
        const fullPath = window.location.href;
        const pathNames = pathname.substring(1, pathname.length).split("/");
        
        const pathList = pathNames.map((path, index): Path | null => {
            if(index === pathNames.length -1) {
                if(fullPath.includes("/?")) {
                    return null
                }
            }
            
            return {
                name: decodeURI(path).toLowerCase(),
                path: fullPath.includes("/?") ? path + fullPath.substring(fullPath.indexOf("/?"), fullPath.length) : path
            }
        })
        
        const pathHeader = document.getElementById("path");
        
        if(pathHeader) {
            pathList.forEach(path => {
                pathHeader.insertAdjacentHTML(
                    "beforeend", 
                    `
                    <span>/</span>
                    <a href="${path!.path}">
                        <span>${" " + path!.name + " "}</span>
                    </a>`
                )
            })
        }
        
    }, [pathname]);

    return null;
}