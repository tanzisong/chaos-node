import { BehaviorSubject } from 'rxjs';
import { useEffect } from 'react';

enum PageMode {
  Layout,
}

enum EditorMode {
  Preview,
  editable,
}

const pageMode$$ = new BehaviorSubject(PageMode.Layout);
const pageMode$ = pageMode$$.asObservable();

function setPageMode(pageMode: PageMode) {
  pageMode$$.next(pageMode);
}

const pageStructure$$ = new BehaviorSubject({
  id: '',
  name: '',
  event: {},
  methods: {},
  page: {
    id: '',
    name: 'view',
    style: {},
    children: [],
  },
});
const pageStructure$ = pageStructure$$.asObservable();
function setPageStructure(pageStructure: any) {
  pageStructure$$.next(pageStructure);
}

// 加一下鼠标事件或者键盘事件

export { pageMode$, setPageMode, pageStructure$, setPageStructure };

/**
 * Observable结合hooks(useContext)实现自动unsubscribe, 并且全局只有一份顶层流
 * */
