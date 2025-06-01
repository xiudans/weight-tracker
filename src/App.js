import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, User, Target, TrendingDown, Calendar, Download, Upload, Trash2 } from 'lucide-react';

const WeightTracker = () => {
  const [activeUser, setActiveUser] = useState('person1');
  const [data, setData] = useState({
    person1: { name: 'xiu', records: [], target: { weight: 70, waist: 80 } },
    person2: { name: '蛋', records: [], target: { weight: 60, waist: 70 } }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    waist: ''
  });

  // 样式对象
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%)',
      padding: '2rem 1rem'
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #9333ea, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.1rem'
    },
    userSwitcher: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem'
    },
    userSwitcherInner: {
      background: 'white',
      borderRadius: '50px',
      padding: '4px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    userButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem'
    },
    userButtonActive: {
      background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
    },
    userButtonInactive: {
      background: 'transparent',
      color: '#6b7280'
    },
    userInput: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      width: '60px',
      textAlign: 'center',
      color: 'inherit',
      fontSize: 'inherit'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      border: '1px solid #f3f4f6'
    },
    statCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statText: {
      color: '#6b7280',
      fontSize: '0.875rem',
      marginBottom: '0.5rem'
    },
    statValue: {
      fontSize: '1.875rem',
      fontWeight: 'bold'
    },
    statIcon: {
      padding: '0.75rem',
      borderRadius: '50%'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2rem'
    },
    chartContainer: {
      background: 'white',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      border: '1px solid #f3f4f6'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1f2937'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#6b7280'
    },
    emptyIcon: {
      width: '4rem',
      height: '4rem',
      margin: '0 auto 1rem',
      opacity: 0.5
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      border: '1px solid #f3f4f6'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    primaryButton: {
      background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
    },
    secondaryButton: {
      background: '#6b7280',
      color: 'white'
    },
    successButton: {
      background: '#10b981',
      color: 'white'
    },
    dangerButton: {
      background: '#ef4444',
      color: 'white'
    },
    blueButton: {
      background: '#3b82f6',
      color: 'white'
    },
    greenButton: {
      background: '#10b981',
      color: 'white'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      borderBottom: '1px solid #e5e7eb',
      textAlign: 'left',
      padding: '0.75rem 1rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    tableCell: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #f3f4f6'
    },
    tableRow: {
      transition: 'background-color 0.2s ease'
    },
    deleteButton: {
      background: 'none',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '4px',
      transition: 'color 0.2s ease'
    }
  };

  // 从localStorage加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('weightTrackerData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // 保存数据到localStorage
  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('weightTrackerData', JSON.stringify(newData));
  };

  // 添加记录
  const addRecord = () => {
    if (!formData.weight || !formData.waist) return;
    
    const newRecord = {
      id: Date.now(),
      date: formData.date,
      weight: parseFloat(formData.weight),
      waist: parseFloat(formData.waist)
    };

    const newData = { ...data };
    newData[activeUser].records.push(newRecord);
    newData[activeUser].records.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    saveData(newData);
    setFormData({ date: new Date().toISOString().split('T')[0], weight: '', waist: '' });
    setShowAddForm(false);
  };

  // 删除记录
  const deleteRecord = (id) => {
    const newData = { ...data };
    newData[activeUser].records = newData[activeUser].records.filter(record => record.id !== id);
    saveData(newData);
  };

  // 更新用户名
  const updateUserName = (user, name) => {
    const newData = { ...data };
    newData[user].name = name;
    saveData(newData);
  };

  // 更新目标
  const updateTarget = (user, target) => {
    const newData = { ...data };
    newData[user].target = target;
    saveData(newData);
  };

  // 导出数据
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'weight-tracker-data.json';
    link.click();
  };

  // 导入数据
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          saveData(importedData);
        } catch (error) {
          alert('导入失败：文件格式不正确');
        }
      };
      reader.readAsText(file);
    }
  };

  const currentUserData = data[activeUser];
  const records = currentUserData.records;
  const latestRecord = records[records.length - 1];

  // 计算统计数据
  const getStats = () => {
    if (records.length === 0) return null;
    
    const firstRecord = records[0];
    const weightChange = latestRecord.weight - firstRecord.weight;
    const waistChange = latestRecord.waist - firstRecord.waist;
    
    return {
      weightChange,
      waistChange,
      totalRecords: records.length
    };
  };

  const stats = getStats();

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* 头部 */}
        <div style={styles.header}>
          <h1 style={styles.title}>健康体重记录</h1>
          <p style={styles.subtitle}>记录和追踪你的健康之路</p>
        </div>

        {/* 用户切换 */}
        <div style={styles.userSwitcher}>
          <div style={styles.userSwitcherInner}>
            {Object.entries(data).map(([key, user]) => (
              <button
                key={key}
                onClick={() => setActiveUser(key)}
                style={{
                  ...styles.userButton,
                  ...(activeUser === key ? styles.userButtonActive : styles.userButtonInactive)
                }}
              >
                <User size={16} style={{ marginRight: '0.5rem' }} />
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => updateUserName(key, e.target.value)}
                  style={styles.userInput}
                  onClick={(e) => e.stopPropagation()}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 统计卡片 */}
        {stats && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statText}>当前体重</p>
                  <p style={{ ...styles.statValue, color: '#8b5cf6' }}>{latestRecord?.weight} kg</p>
                </div>
                <div style={{ ...styles.statIcon, background: '#f3e8ff' }}>
                  <TrendingDown size={24} color="#8b5cf6" />
                </div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statText}>当前腰围</p>
                  <p style={{ ...styles.statValue, color: '#ec4899' }}>{latestRecord?.waist} cm</p>
                </div>
                <div style={{ ...styles.statIcon, background: '#fce7f3' }}>
                  <Target size={24} color="#ec4899" />
                </div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statText}>体重变化</p>
                  <p style={{ 
                    ...styles.statValue, 
                    color: stats.weightChange > 0 ? '#ef4444' : '#10b981' 
                  }}>
                    {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)} kg
                  </p>
                </div>
                <div style={{ ...styles.statIcon, background: '#dbeafe' }}>
                  <Calendar size={24} color="#3b82f6" />
                </div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statText}>记录总数</p>
                  <p style={{ ...styles.statValue, color: '#10b981' }}>{stats.totalRecords}</p>
                </div>
                <div style={{ ...styles.statIcon, background: '#d1fae5' }}>
                  <User size={24} color="#10b981" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '2fr 1fr' : '1fr',
          gap: '2rem'
        }}>
          {/* 图表区域 */}
          <div style={styles.chartContainer}>
            <h2 style={styles.sectionTitle}>趋势图表</h2>
            {records.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={records}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                    name="体重 (kg)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="waist" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
                    name="腰围 (cm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={styles.emptyState}>
                <Target style={styles.emptyIcon} />
                <p>还没有记录数据，开始添加第一条记录吧！</p>
              </div>
            )}
          </div>

          {/* 操作面板 */}
          <div style={styles.sidebar}>
            {/* 添加记录 */}
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>添加记录</h2>
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  style={{ ...styles.button, ...styles.primaryButton }}
                >
                  <Plus size={20} />
                  新增记录
                </button>
              ) : (
                <div>
                  <div style={styles.formGroup}>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <input
                      type="number"
                      placeholder="体重 (kg)"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <input
                      type="number"
                      placeholder="腰围 (cm)"
                      value={formData.waist}
                      onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={addRecord}
                      style={{ ...styles.button, ...styles.successButton, flex: 1 }}
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      style={{ ...styles.button, ...styles.secondaryButton, flex: 1 }}
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 目标设定 */}
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>目标设定</h2>
              <div style={styles.formGroup}>
                <label style={styles.label}>目标体重 (kg)</label>
                <input
                  type="number"
                  value={currentUserData.target.weight}
                  onChange={(e) => updateTarget(activeUser, { ...currentUserData.target, weight: parseFloat(e.target.value) })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>目标腰围 (cm)</label>
                <input
                  type="number"
                  value={currentUserData.target.waist}
                  onChange={(e) => updateTarget(activeUser, { ...currentUserData.target, waist: parseFloat(e.target.value) })}
                  style={styles.input}
                />
              </div>
            </div>

            {/* 数据管理 */}
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>数据管理</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={exportData}
                  style={{ ...styles.button, ...styles.blueButton }}
                >
                  <Download size={20} />
                  导出数据
                </button>
                <label style={{ ...styles.button, ...styles.greenButton, cursor: 'pointer' }}>
                  <Upload size={20} />
                  导入数据
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 历史记录 */}
        <div style={{ ...styles.card, marginTop: '2rem' }}>
          <h2 style={styles.sectionTitle}>历史记录</h2>
          {records.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>日期</th>
                    <th style={styles.tableHeader}>体重 (kg)</th>
                    <th style={styles.tableHeader}>腰围 (cm)</th>
                    <th style={styles.tableHeader}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {records.slice().reverse().map((record) => (
                    <tr 
                      key={record.id} 
                      style={styles.tableRow}
                      onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = 'transparent'}
                    >
                      <td style={styles.tableCell}>{record.date}</td>
                      <td style={{ ...styles.tableCell, fontWeight: '600', color: '#8b5cf6' }}>{record.weight}</td>
                      <td style={{ ...styles.tableCell, fontWeight: '600', color: '#ec4899' }}>{record.waist}</td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          style={styles.deleteButton}
                          onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                          onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <Calendar style={styles.emptyIcon} />
              <p>暂无历史记录</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;