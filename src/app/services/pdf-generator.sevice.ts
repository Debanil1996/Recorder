
import { Injectable } from '@angular/core';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { File } from "@ionic-native/file/ngx";
import pdfMake from "pdfmake/build/pdfmake";

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor(
        private fileOpener: FileOpener,
        private file: File,
    ){
        
    }
}


