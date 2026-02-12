#!/usr/bin/env python3
"""
检查服务器状态
"""
import requests
import sys

def check_server(url="http://localhost:5000"):
    """检查服务器是否运行"""
    try:
        response = requests.get(url, timeout=2)
        if response.status_code == 200:
            print(f"✅ 服务器运行正常: {url}")
            print(f"   状态码: {response.status_code}")
            return True
        else:
            print(f"⚠️  服务器响应异常: {url}")
            print(f"   状态码: {response.status_code}")
            print(f"   响应: {response.text[:200]}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"❌ 无法连接到服务器: {url}")
        print("   可能的原因:")
        print("   1. 服务器未启动")
        print("   2. 服务器运行在不同端口")
        print("   3. 防火墙阻止连接")
        return False
    except Exception as e:
        print(f"❌ 检查失败: {e}")
        return False

if __name__ == '__main__':
    print("=" * 60)
    print("检查 EHR Agent Web 服务器状态")
    print("=" * 60)
    
    # 检查多个可能的端口
    ports = [5000, 5001, 5002, 8080]
    found = False
    
    for port in ports:
        url = f"http://localhost:{port}"
        print(f"\n检查 {url}...")
        if check_server(url):
            found = True
            print(f"\n✅ 请访问: {url}")
            break
    
    if not found:
        print("\n" + "=" * 60)
        print("未找到运行中的服务器")
        print("=" * 60)
        print("\n请启动服务器:")
        print("  python run_web.py")
        print("  或")
        print("  python app.py")
        sys.exit(1)

