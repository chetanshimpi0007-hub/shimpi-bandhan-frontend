import api from './api';

export const reportService = {
  getDashboardSummary: () => api.get('/admin/reports/dashboard-summary'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getPayments: (params) => api.get('/admin/payments', { params }),
  getBusinesses: (params) => api.get('/admin/businesses', { params }),
  getAuditLogs: (params) => api.get('/admin/reports/audit-logs', { params }),
  getChartData: (chartType, params) => api.get(`/admin/reports/charts/${chartType}`, { params })
};
