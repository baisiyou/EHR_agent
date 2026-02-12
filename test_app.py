#!/usr/bin/env python3
"""
测试 Flask 应用是否能正常启动
"""
import sys
import os

# 添加当前目录到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from app import app
    
    print("=" * 60)
    print("测试 Flask 应用")
    print("=" * 60)
    
    # 检查模板和静态文件
    print(f"\n模板文件夹: {app.template_folder}")
    print(f"静态文件夹: {app.static_folder}")
    
    # 检查文件是否存在
    import os
    template_path = os.path.join(app.template_folder, 'index.html')
    static_css = os.path.join(app.static_folder, 'css', 'style.css')
    static_js = os.path.join(app.static_folder, 'js', 'app.js')
    
    print(f"\n文件检查:")
    print(f"  模板文件: {template_path} - {'存在' if os.path.exists(template_path) else '不存在'}")
    print(f"  CSS文件: {static_css} - {'存在' if os.path.exists(static_css) else '不存在'}")
    print(f"  JS文件: {static_js} - {'存在' if os.path.exists(static_js) else '不存在'}")
    
    # 测试路由
    with app.test_client() as client:
        print(f"\n路由测试:")
        response = client.get('/')
        print(f"  GET / - 状态码: {response.status_code}")
        if response.status_code == 200:
            print("  ✅ 主页路由正常")
        else:
            print(f"  ❌ 主页路由错误: {response.data.decode()[:100]}")
    
    print("\n" + "=" * 60)
    print("✅ 应用测试完成")
    print("=" * 60)
    
except Exception as e:
    print(f"\n❌ 错误: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

