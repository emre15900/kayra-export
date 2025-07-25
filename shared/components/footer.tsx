import React from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Divider, Space } from 'antd';
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

interface FooterProps {
  baseUrl?: string;
}

export function Footer({ baseUrl = 'http://localhost:3000' }: FooterProps) {
  return (
    <AntFooter style={{ background: '#141414', color: '#fff', padding: '48px 0', marginTop: 64 }}>
      <div className="container mx-auto px-4">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={6}>
            <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 12 }}>MicroStore</div>
            <div style={{ color: '#bfbfbf', fontSize: 14, marginBottom: 16 }}>
              Modern e-commerce meets micro-frontend architecture.
            </div>
            <Space size="middle">
              <a href="https://facebook.com" target="_blank" rel="noopener" style={{ color: '#1877f2', fontSize: 22 }}><FacebookFilled /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener" style={{ color: '#1da1f2', fontSize: 22 }}><TwitterSquareFilled /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener" style={{ color: '#e1306c', fontSize: 22 }}><InstagramFilled /></a>
            </Space>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <div className="font-semibold mb-4" style={{ fontWeight: 600, marginBottom: 16 }}>Shop</div>
            <Space direction="vertical" size={8} style={{ color: '#bfbfbf' }}>
              <Link href={`${baseUrl}/products`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Electronics</Link>
              <Link href={`${baseUrl}/products`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Accessories</Link>
              <Link href={`${baseUrl}/products`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Home & Kitchen</Link>
            </Space>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <div className="font-semibold mb-4" style={{ fontWeight: 600, marginBottom: 16 }}>Support</div>
            <Space direction="vertical" size={8} style={{ color: '#bfbfbf' }}>
              <Link href={`${baseUrl}/help`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Help Center</Link>
              <Link href={`${baseUrl}/contact`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Contact</Link>
              <Link href={`${baseUrl}/returns`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Returns</Link>
            </Space>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <div className="font-semibold mb-4" style={{ fontWeight: 600, marginBottom: 16 }}>Company</div>
            <Space direction="vertical" size={8} style={{ color: '#bfbfbf' }}>
              <Link href={`${baseUrl}/about`} className="hover:text-white" style={{ color: '#bfbfbf' }}>About</Link>
              <Link href={`${baseUrl}/careers`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Careers</Link>
              <Link href={`${baseUrl}/privacy`} className="hover:text-white" style={{ color: '#bfbfbf' }}>Privacy</Link>
            </Space>
          </Col>
        </Row>
        <Divider style={{ background: '#222', margin: '40px 0 0 0' }} />
        <div style={{ textAlign: 'center', color: '#bfbfbf', fontSize: 13, marginTop: 24 }}>
          &copy; 2024 MicroStore. All rights reserved.
        </div>
      </div>
    </AntFooter>
  );
} 