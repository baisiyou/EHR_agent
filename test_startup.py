#!/usr/bin/env python3
"""
测试应用启动
"""
import sys
import os

print("=" * 60)
print("测试 EHR Agent 应用启动")
print("=" * 60)

# 1. 检查工作目录
print(f"\n1. 当前工作目录: {os.getcwd()}")

# 2. 检查文件
print("\n2. 检查文件:")
files_to_check = [
    'templates/index.html',
    'static/css/style.css',
    'static/js/app.js',
    'app.py',
    'config.py'
]
for file in files_to_check:
    exists = os.path.exists(file)
    status = "✅" if exists else "❌"
    print(f"   {status} {file}")

# 3. 检查配置
print("\n3. 检查配置:")
try:
    from config import GOOGLE_API_KEY, GEMINI_MODEL
    if GOOGLE_API_KEY and GOOGLE_API_KEY != "your_google_api_key_here":
        print(f"   ✅ API Key 已配置 (前10位: {GOOGLE_API_KEY[:10]}...)")
    else:
        print("   ⚠️  API Key 未配置")
    print(f"   ✅ 模型: {GEMINI_MODEL}")
except Exception as e:
    print(f"   ❌ 配置加载失败: {e}")

# 4. 测试导入
print("\n4. 测试导入:")
try:
    from app import app
    print("   ✅ app 模块导入成功")
    print(f"   ✅ 模板文件夹: {app.template_folder}")
    print(f"   ✅ 静态文件夹: {app.static_folder}")
except Exception as e:
    print(f"   ❌ 导入失败: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# 5. 测试路由
print("\n5. 测试路由:")
with app.test_client() as client:
    try:
        response = client.get('/')
        print(f"   ✅ 主页路由: {response.status_code}")
        if response.status_code == 200:
            print("   ✅ 应用可以正常响应")
        else:
            print(f"   ⚠️  状态码异常: {response.status_code}")
    except Exception as e:
        print(f"   ❌ 路由测试失败: {e}")

print("\n" + "=" * 60)
print("✅ 测试完成！应用可以启动")
print("=" * 60)
print("\n现在可以运行: python run_web.py")

