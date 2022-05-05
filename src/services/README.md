# axios 请求封装

数据返回约定格式

```bash
 {
   data: any;
   code: 0; 0为正常 其他状态业务报错
   message: string;
 }
```

## useRequest 使用方式

```bash
  const { run, loading } = useRequest(() => {}, {manual: true})
  const { data, error, loading } = useRequest(() => {
    return services.getUserList('/api/test');
  });
```
