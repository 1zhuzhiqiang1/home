import { Loading } from 'element-ui';
import {ElLoadingComponent} from "element-ui/types/loading";

export const LoadingUtil = {

    showSimpleLoading(): ElLoadingComponent{
        return Loading.service({
            lock: true,
            text: '请稍等',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
};