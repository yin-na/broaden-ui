/**
 *  李素素
 *  */ 
// 任务中心设置name：省教育局 0 市教育局 1 区教育局 2 学校 3 学生年级 4-1 学生班级 4-2 教职工 5 家长年级 6-1 家长班级 6-2 校外机构 7 咨询师 8
export const setName = (name) => {
    let addName = ''
    switch (name) {//市教育局 1 区教育局 2 学校 3 学生年级 4-1 学生班级 4-2 教职工 5 家长年级 6-1 家长班级 6-2
        case '1':
            addName = "市教育局";
            break;
        case '2':
            addName = "区教育局";
            break;
        case '3':
            addName = "学校";
            break;
        case '4-1':
            addName = "学生年级";
            break;
        case '4-2':
            addName = "学生班级";
            break;
        case '5':
            addName = "教职工";
            break;
        case '6-1':
            addName = "家长年级";
            break;
        case '6-2':
            addName = "家长班级";
            break;
        case '7':
            addName = "校外机构";
            break;
    }

    return addName
}

// 任务中心设置type// 0.测试 1.问答 2.直播 3.团辅 4.资源 5.调查 6.其他
export const setType = (type) => {
    let addType = ''
    switch (type) { 
        case '0':
            addType = "测评";
            break;
        case '1':
            addType = "问答";
            break;
        case '2':
            addType = "直播";
            break;
        case '3':
            addType = "团辅";
            break;
        case '4':
            addType = "资源";
            break;
        case '5':
            addType = "调查";
            break;
        case '6':
            addType = "其他";
            break;
    }

    return addType
}

export const setNumber = (time) => {
    if (!time) {
        return
    }
    let list = time.split('-'), all = ''
    list.forEach(element => {
        all += element
    });

    return all
}

// 任务中心table排序
export const sortMethod = (a, b, name, flag) => {
    let aList = a[name]
    let bList = b[name]
    if (flag == 'time') {
        bList = setNumber(b[name])
        aList = setNumber(a[name])
    }

    let flaged = parseInt(aList) - parseInt(bList);
    return flaged
}

// 正常排序
export const sortMethodAB = (a, b, flag) => {
    let aList = flag == 'time' ? setNumber(a) : a
    let bList = flag == 'time' ? setNumber(b) : b
    
    let flaged = parseInt(aList) - parseInt(bList);
    return flaged
}



