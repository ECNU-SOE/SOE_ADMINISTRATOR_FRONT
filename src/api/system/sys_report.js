import {newJwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";

export const getReportList = function (opt){
    return newJwtServerInstance.request({
        url:`/corpus-server/api/transcript/v1/getTranscriptInfo`,
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}

export const deleteReport = function (opt){
    return newJwtServerInstance.request({
        url:`/corpus-server/api/transcript/v1/deleteTranscriptInfo?transcriptId=${opt.id}`,
        method:'get',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}