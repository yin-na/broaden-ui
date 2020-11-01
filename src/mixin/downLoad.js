import { fileDownload } from "@/api/publication/publish.js"

export default {
    methods: {
        // 下载
        handlePreview(resList) {
            if (!resList.url) {
                return
            }
            let url =  resList.url.split('/group')[1]
            fileDownload({
                fileurl: 'group' + url,
                fileName: resList.name
            }).then((res) => {
                const blob = new Blob([res]);
                const elink = document.createElement('a');
                elink.download = resList.name;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink); 
            })
        }
    },
}