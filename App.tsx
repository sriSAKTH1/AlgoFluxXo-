
import React, { useState, createContext, useContext, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StackVisualizer from './components/StackVisualizer';
import ChatInterface from './components/ChatInterface';
import LiveTutor from './components/LiveTutor';
import ImageAnalyzer from './components/ImageAnalyzer';
import VisualizationPlayer from './components/VisualizationPlayer';
import ArrayVisualizer from './components/ArrayVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import StringVisualizer from './components/StringVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import SortingVisualizer from './components/SortingVisualizer';
import ChatToLearn from './components/ChatToLearn';
import SearchingVisualizer from './components/SearchingVisualizer';
import GraphSearchVisualizer from './components/GraphSearchVisualizer';
import AdvancedGraphVisualizer from './components/AdvancedGraphVisualizer';
import LinearDataStructures from './components/LinearDataStructures';
import NonLinearDataStructures from './components/NonLinearDataStructures';
import TimeSpaceComplexity from './components/TimeSpaceComplexity';
import SettingsAndHelp from './components/SettingsAndHelp';
import MyNotes from './components/MyNotes';
import PracticeIDE from './components/PracticeIDE';
import Notification from './components/Notification';
import Login from './components/Login';
import Signup from './components/Signup';
import { authService, User } from './services/authService';
import type { ApiErrorNotification } from './services/apiErrorHandler';

// Create context for global notification and navigation
interface AppContextType {
    showNotification: (notification: ApiErrorNotification) => void;
    navigateToSettings: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppContext.Provider');
    return context;
};

export const App: React.FC = () => {
    // Authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authView, setAuthView] = useState<'login' | 'signup'>('login');

    // App state
    const [activeTab, setActiveTab] = useState('home');
    const [homeSubTab, setHomeSubTab] = useState<'ds' | 'algo'>('ds');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [notifications, setNotifications] = useState<Array<ApiErrorNotification & { id: string }>>([]);

    // Check if user is already logged in on mount
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
        }
    }, []);

    // Authentication handlers
    const handleLoginSuccess = () => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        setIsLoggedIn(true);
    };

    const handleSignupSuccess = () => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(null);
        setIsLoggedIn(false);
        setActiveTab('home');
    };

    const showNotification = (notification: ApiErrorNotification) => {
        const id = Date.now().toString();
        setNotifications(prev => [...prev, { ...notification, id }]);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const navigateToSettings = () => {
        setActiveTab('settings-help');
    };

    const appContextValue: AppContextType = {
        showNotification,
        navigateToSettings
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'visualization':
                return <VisualizationPlayer />;
            case 'stack':
                return <StackVisualizer />;
            case 'linear-ds':
                return <LinearDataStructures />;
            case 'non-linear-ds':
                return <NonLinearDataStructures />;
            case 'array':
                return <ArrayVisualizer />;
            case 'queue':
                return <QueueVisualizer />;
            case 'linkedlist':
                return <LinkedListVisualizer />;
            case 'tree':
                return <TreeVisualizer />;
            case 'graph':
                return <TreeVisualizer />; // Using Tree visualizer as placeholder for Graph
            case 'trie':
                return <TreeVisualizer />; // Using Tree visualizer as placeholder for Trie
            case 'hashtable':
                return <ArrayVisualizer />; // Using Array visualizer as placeholder for Hash Table
            case 'string':
                return <StringVisualizer />;

            // Sorting Routes
            case 'bubblesort':
                return <SortingVisualizer initialAlgorithm="BUBBLE" />;
            case 'selectionsort':
                return <SortingVisualizer initialAlgorithm="SELECTION" />;
            case 'insertionsort':
                return <SortingVisualizer initialAlgorithm="INSERTION" />;
            case 'mergesort':
                return <SortingVisualizer initialAlgorithm="MERGE" />;
            case 'quicksort':
                return <SortingVisualizer initialAlgorithm="QUICK" />;
            case 'heapsort':
                return <SortingVisualizer initialAlgorithm="HEAP" />;
            case 'bucketsort':
                return <SortingVisualizer initialAlgorithm="BUCKET" />;

            // Searching Routes
            case 'linearsearch':
                return <SearchingVisualizer initialAlgorithm="LINEAR" />;
            case 'binarysearch':
                return <SearchingVisualizer initialAlgorithm="BINARY" />;
            case 'bfs':
                return <GraphSearchVisualizer initialAlgorithm="BFS" />;
            case 'dfs':
                return <GraphSearchVisualizer initialAlgorithm="DFS" />;

            // Advanced Graph Algorithms - Shortest Path
            case 'dijkstra':
                return <AdvancedGraphVisualizer initialAlgorithm="DIJKSTRA" />;
            case 'bellmanford':
                return <AdvancedGraphVisualizer initialAlgorithm="BELLMAN_FORD" />;
            case 'floydwarshall':
                return <AdvancedGraphVisualizer initialAlgorithm="FLOYD_WARSHALL" />;
            case 'astar':
                return <AdvancedGraphVisualizer initialAlgorithm="A_STAR" />;

            // Minimum Spanning Tree
            case 'kruskal':
                return <AdvancedGraphVisualizer initialAlgorithm="KRUSKAL" />;
            case 'prim':
                return <AdvancedGraphVisualizer initialAlgorithm="PRIM" />;

            // Graph Representations
            case 'adjlist':
                return <AdvancedGraphVisualizer initialAlgorithm="ADJ_LIST" />;
            case 'adjmatrix':
                return <AdvancedGraphVisualizer initialAlgorithm="ADJ_MATRIX" />;

            case 'live-tutor':
                return <LiveTutor />;
            case 'image-analyzer':
                return <ImageAnalyzer />;
            case 'chat-learn':
                return <ChatToLearn />;
            case 'complexity':
                return <TimeSpaceComplexity />;
            case 'settings-help':
                return <SettingsAndHelp onLogout={handleLogout} />;
            case 'my-notes':
                return <MyNotes />;
            case 'practice-ide':
                return <PracticeIDE />;
            case 'q2va':
                return (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        <div className="text-center">
                            <i className="fa-solid fa-wand-magic-sparkles text-6xl mb-6 text-indigo-300"></i>
                            <h2 className="text-2xl font-bold text-slate-700 mb-2">Q 2 VA</h2>
                            <p className="text-slate-500">Question to Visual Animation module coming soon.</p>
                        </div>
                    </div>
                );
            case 'home':
                return (
                    <div className="w-full h-full bg-slate-50 overflow-y-auto relative scroll-smooth">
                        {/* Fixed Background Pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none fixed"></div>

                        {/* CSS for Tree Diagram */}
                        <style>{`
                    .tf-tree {
                        display: flex;
                        justify-content: center;
                        font-size: 12px;
                    }
                    .tf-tree ul {
                        padding-top: 20px; 
                        position: relative;
                        display: flex;
                        justify-content: center;
                    }
                    .tf-tree li {
                        float: left; text-align: center;
                        list-style-type: none;
                        position: relative;
                        padding: 20px 5px 0 5px;
                    }
                    /* Connectors */
                    .tf-tree li::before, .tf-tree li::after {
                        content: '';
                        position: absolute; top: 0; right: 50%;
                        border-top: 1px solid #64748b;
                        width: 50%; height: 20px;
                    }
                    .tf-tree li::after {
                        right: auto; left: 50%;
                        border-left: 1px solid #64748b;
                    }
                    .tf-tree li:only-child::after, .tf-tree li:only-child::before {
                        display: none;
                    }
                    .tf-tree li:only-child { padding-top: 0; }
                    .tf-tree li:first-child::before, .tf-tree li:last-child::after {
                        border: 0 none;
                    }
                    .tf-tree li:last-child::before{
                        border-right: 1px solid #64748b;
                        border-radius: 0 5px 0 0;
                    }
                    .tf-tree li:first-child::after{
                        border-radius: 5px 0 0 0;
                    }
                    /* Down connectors from parents */
                    .tf-tree ul ul::before{
                        content: '';
                        position: absolute; top: 0; left: 50%;
                        border-left: 1px solid #64748b;
                        width: 0; height: 20px;
                    }
                    /* Node Styling */
                    .tf-nc {
                        display: inline-block;
                        border: 0;
                        padding: 10px 16px;
                        background-color: #22d3ee; /* Cyan-400 */
                        color: #0f172a;
                        font-weight: 600;
                        text-decoration: none;
                        border-radius: 6px;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                        position: relative;
                        z-index: 10;
                        transition: all 0.2s;
                    }
                    .tf-nc:hover {
                        transform: scale(1.05);
                        background-color: #06b6d4; /* Cyan-500 */
                    }
                    @media (min-width: 768px) {
                        .tf-tree { font-size: 14px; }
                        .tf-nc { padding: 12px 20px; }
                    }
                    @keyframes slideUpFade {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-on-load {
                        animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>

                        <div className="max-w-7xl mx-auto p-6 sm:p-12 relative z-10 pb-24">

                            {/* Home Header Toggle */}
                            <div className="flex justify-center mb-12">
                                <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex">
                                    <button
                                        onClick={() => setHomeSubTab('ds')}
                                        className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${homeSubTab === 'ds'
                                            ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                            }`}
                                    >
                                        Data Structures
                                    </button>
                                    <button
                                        onClick={() => setHomeSubTab('algo')}
                                        className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${homeSubTab === 'algo'
                                            ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                            }`}
                                    >
                                        Algorithms
                                    </button>
                                </div>
                            </div>

                            {homeSubTab === 'ds' ? (
                                <div className="space-y-16">
                                    {/* Section 1: Definition */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '0ms' }}>
                                        <div className="text-center mb-10">
                                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
                                                What Is a <span className="text-indigo-600">Data Structure</span>?
                                            </h1>
                                            <div className="h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
                                        </div>

                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                                            <p className="text-xl text-slate-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                                                A data structure is a structured way of <span className="font-bold text-indigo-600">organizing, storing, processing, and retrieving</span> data efficiently.
                                                It ensures data is arranged so both humans and machines can work with it easily.
                                            </p>

                                            <h3 className="font-bold text-slate-800 mb-6 text-lg border-l-4 border-indigo-500 pl-3">Data structures make it possible to:</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    { text: 'Store information properly', icon: 'fa-box-archive' },
                                                    { text: 'Access data fast', icon: 'fa-bolt' },
                                                    { text: 'Update and manage data efficiently', icon: 'fa-pen-to-square' },
                                                    { text: 'Solve complex problems in less time', icon: 'fa-puzzle-piece' }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-transform hover:scale-[1.01]">
                                                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 border border-slate-100">
                                                            <i className={`fa-solid ${item.icon}`}></i>
                                                        </div>
                                                        <span className="text-slate-700 font-medium text-lg">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 2: Importance (Moved up) */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '100ms' }}>
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Are Data Structures Important?</h2>
                                            <p className="text-slate-600 text-lg max-w-3xl">
                                                Data structures are the core building blocks of software development. They allow applications to handle data smoothly and efficiently.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Good */}
                                            <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                                <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
                                                        <i className="fa-solid fa-check"></i>
                                                    </div>
                                                    Using the Correct Structure
                                                </h3>
                                                <ul className="space-y-4">
                                                    {[
                                                        { t: 'Faster performance', d: 'Operations complete in milliseconds.' },
                                                        { t: 'Less memory usage', d: 'Resources are optimized.' },
                                                        { t: 'Scalable code', d: 'Systems grow without crashing.' }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-emerald-900">
                                                            <i className="fa-solid fa-circle-check text-emerald-500 mt-1"></i>
                                                            <div>
                                                                <span className="font-bold block">{item.t}</span>
                                                                <span className="text-sm opacity-80">{item.d}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Bad */}
                                            <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                                <h3 className="text-xl font-bold text-rose-800 mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center text-rose-700">
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </div>
                                                    Using the Wrong Structure
                                                </h3>
                                                <ul className="space-y-4">
                                                    {[
                                                        { t: 'Slow applications', d: 'Loading times frustrate users.' },
                                                        { t: 'High memory consumption', d: 'Devices run out of RAM.' },
                                                        { t: 'Bad user experiences', d: 'Lags and crashes occur.' }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-rose-900">
                                                            <i className="fa-solid fa-circle-xmark text-rose-500 mt-1"></i>
                                                            <div>
                                                                <span className="font-bold block">{item.t}</span>
                                                                <span className="text-sm opacity-80">{item.d}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 3: Factors (Moved up) */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '150ms' }}>
                                        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
                                            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
                                            <div className="absolute -left-20 bottom-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>

                                            <h2 className="text-2xl md:text-3xl font-bold mb-8 relative z-10 flex items-center gap-3">
                                                <i className="fa-regular fa-lightbulb text-yellow-400"></i>
                                                Factors to Consider When Choosing
                                            </h2>

                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
                                                <div className="space-y-5">
                                                    <p className="text-slate-300 italic mb-2 text-lg">Before selecting a data structure, ask:</p>
                                                    {[
                                                        'What type of data will be stored?',
                                                        'How will the data be accessed or modified?',
                                                        'Should the data remain stored after execution?',
                                                        'What is the best way to organize the data?',
                                                        'What memory and storage limitations exist?'
                                                    ].map((q, i) => (
                                                        <div key={i} className="flex gap-4 items-center bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                                            <span className="text-indigo-400 text-xl">🔹</span>
                                                            <span className="text-slate-100 font-medium">{q}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col justify-center">
                                                    <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-md border border-white/10">
                                                        <div className="space-y-6">
                                                            <div className="p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                                                                <span className="text-emerald-300 font-bold text-lg">Good Selection</span>
                                                                <i className="fa-solid fa-arrow-right text-white/50"></i>
                                                                <span className="text-white font-bold text-lg bg-emerald-600 px-3 py-1 rounded">Efficient Code</span>
                                                            </div>
                                                            <div className="p-4 bg-rose-500/20 rounded-xl border border-rose-500/30 flex items-center justify-between">
                                                                <span className="text-rose-300 font-bold text-lg">Poor Selection</span>
                                                                <i className="fa-solid fa-arrow-right text-white/50"></i>
                                                                <span className="text-white font-bold text-lg bg-rose-600 px-3 py-1 rounded">Slow Systems</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 4: Usage Grid (Moved up) */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '200ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">How Data Structures Are Used</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {[
                                                { icon: 'fa-database', title: 'Storing Data', text: 'Organizing databases efficiently so retrieval is instant.' },
                                                { icon: 'fa-arrow-down-a-z', title: 'Sorting & Indexing', text: 'Arranging information logically for quick access.' },
                                                { icon: 'fa-magnifying-glass', title: 'Searching', text: 'Finding complex results instantly within massive datasets.' },
                                                { icon: 'fa-microchip', title: 'System Resources', text: 'Managing memory allocation and CPU processing tasks.' },
                                                { icon: 'fa-network-wired', title: 'Data Exchange', text: 'Moving data packets reliably between different systems.' },
                                                { icon: 'fa-chart-line', title: 'Scalability', text: 'Handling massive growth in users and data seamlessly.' },
                                            ].map((item, i) => (
                                                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
                                                    <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 text-2xl shadow-sm">
                                                        <i className={`fa-solid ${item.icon}`}></i>
                                                    </div>
                                                    <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Section 5: Classification Tree */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '250ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Classification of Data Structures</h2>
                                        <div className="min-h-[600px] w-full">
                                            <div className="w-full flex justify-center py-4">
                                                <div className="tf-tree">
                                                    <ul>
                                                        <li>
                                                            <span className="tf-nc">Types of data structure</span>
                                                            <ul>
                                                                <li>
                                                                    <span className="tf-nc">Primitive Data</span>
                                                                    <ul>
                                                                        <li><span className="tf-nc">Integer</span></li>
                                                                        <li><span className="tf-nc">Float</span></li>
                                                                        <li><span className="tf-nc">Character</span></li>
                                                                        <li><span className="tf-nc">Boolean</span></li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <span className="tf-nc">Nonprimitive Data</span>
                                                                    <ul>
                                                                        <li>
                                                                            <span className="tf-nc">Linear Data</span>
                                                                            <ul>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-table-cells text-indigo-600 mr-2"></i>Array</span></li>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-layer-group text-indigo-600 mr-2"></i>Stack</span></li>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-people-arrows text-indigo-600 mr-2"></i>Queue</span></li>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-link text-indigo-600 mr-2"></i>Linked list</span></li>
                                                                            </ul>
                                                                        </li>
                                                                        <li>
                                                                            <span className="tf-nc">Non-linear Data</span>
                                                                            <ul>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-sitemap text-indigo-600 mr-2"></i>Tree</span></li>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-diagram-project text-indigo-600 mr-2"></i>Graph</span></li>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-network-wired text-indigo-600 mr-2"></i>Trie</span></li>
                                                                                <li><span className="tf-nc"><i className="fa-solid fa-table text-indigo-600 mr-2"></i>Hash table</span></li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 6: Types of Data Structures */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '300ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Types of Data Structures</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Primitive */}
                                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                                <h3 className="text-xl font-bold text-indigo-600 mb-4 border-b pb-2">1. Primitive Data Structures</h3>
                                                <p className="text-slate-600 mb-4">Basic data types provided by programming languages.</p>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Integer (int)</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Boolean (true/false)</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Character (char)</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Float (float)</li>
                                                </ul>
                                            </div>
                                            {/* Non-Primitive */}
                                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                                <h3 className="text-xl font-bold text-indigo-600 mb-4 border-b pb-2">2. Non-Primitive Data Structures</h3>
                                                <p className="text-slate-600 mb-4">Built using primitive types and used for complex data management.</p>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Arrays</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Linked Lists</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Stacks & Queues</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Trees & Graphs</li>
                                                    <li className="flex items-center gap-2 text-slate-700"><i className="fa-solid fa-check text-emerald-500"></i> Hash Tables</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 7: Classification Table */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '350ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Classification Categories</h2>
                                        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
                                                        <th className="p-4 border-b font-bold">Category</th>
                                                        <th className="p-4 border-b font-bold">Meaning</th>
                                                        <th className="p-4 border-b font-bold">Examples</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-600 text-sm">
                                                    {[
                                                        { cat: 'Linear', mean: 'Data arranged sequentially', ex: 'Array, Stack, Queue, Linked List' },
                                                        { cat: 'Non-Linear', mean: 'Organized hierarchically or in networks', ex: 'Trees, Graphs' },
                                                        { cat: 'Homogeneous', mean: 'Same type of elements', ex: 'Arrays' },
                                                        { cat: 'Heterogeneous', mean: 'Mixed element types', ex: 'Structures, Classes' },
                                                        { cat: 'Static', mean: 'Fixed memory size', ex: 'Arrays' },
                                                        { cat: 'Dynamic', mean: 'Can grow or shrink', ex: 'Linked List, Trees' },
                                                    ].map((row, i) => (
                                                        <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                                            <td className="p-4 font-bold text-indigo-700">{row.cat}</td>
                                                            <td className="p-4">{row.mean}</td>
                                                            <td className="p-4 font-mono text-xs bg-slate-50 rounded">{row.ex}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Section 8: Real World Use Cases */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '400ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Real-World Use Cases</h2>
                                        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
                                                        <th className="p-4 border-b font-bold">Real Application</th>
                                                        <th className="p-4 border-b font-bold">Data Structures Used</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-600 text-sm">
                                                    {[
                                                        { app: 'Search Engines (Google, Bing)', ds: 'Graphs, Hash Tables, Trees' },
                                                        { app: 'Social Media (Instagram, Facebook)', ds: 'Graphs, Queues' },
                                                        { app: 'Maps & GPS', ds: 'Graphs (Shortest Path Algorithms)' },
                                                        { app: 'E-commerce Search/Filters', ds: 'Trees, Hashing, Heaps' },
                                                        { app: 'Operating Systems', ds: 'Queues, Trees' },
                                                        { app: 'Machine Learning & AI', ds: 'Matrices, Arrays, Graphs' },
                                                        { app: 'Streaming Platforms', ds: 'Queues, Trees' }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                                            <td className="p-4 font-medium text-slate-800">{row.app}</td>
                                                            <td className="p-4 text-indigo-600 font-medium">{row.ds}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Section 9: Why Learn DSA */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '450ms' }}>
                                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                                            <h2 className="text-3xl font-bold mb-6 relative z-10">Why Learn DSA?</h2>
                                            <p className="text-indigo-100 mb-8 text-lg relative z-10">Learning Data Structures and Algorithms transforms you from a coder to a software engineer.</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                                                {[
                                                    'Write optimized and scalable code',
                                                    'Build high-performance applications',
                                                    'Think logically and solve problems faster',
                                                    'Perform well in technical interviews',
                                                    'Understand how real-world systems operate'
                                                ].map((item, i) => (
                                                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 rounded-full bg-white text-indigo-700 flex items-center justify-center shrink-0">
                                                            <i className="fa-solid fa-check text-sm"></i>
                                                        </div>
                                                        <span className="font-medium text-sm md:text-base">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Footer Image Text */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '500ms' }}>
                                        <div className="w-full py-24 flex justify-center items-center overflow-hidden relative">
                                            <h1 className="text-[3rem] sm:text-[5rem] md:text-[7rem] font-black tracking-tighter text-slate-900 uppercase select-none leading-none text-center px-4 flex flex-wrap justify-center gap-x-4">
                                                {/* DATA */}
                                                <span className="flex">
                                                    {"DATA".split("").map((char, i) => (
                                                        <span key={i} className="cursor-default transition-all duration-300 hover:text-indigo-500 hover:-translate-y-2 hover:scale-110 inline-block">
                                                            {char}
                                                        </span>
                                                    ))}
                                                </span>
                                                {/* STRUCTURE */}
                                                <span className="flex">
                                                    {"STRUCTURE".split("").map((char, i) => (
                                                        <span key={i} className="cursor-default transition-all duration-300 hover:text-indigo-500 hover:-translate-y-2 hover:scale-110 inline-block">
                                                            {char}
                                                        </span>
                                                    ))}
                                                </span>
                                            </h1>
                                        </div>
                                    </section>
                                </div>
                            ) : (
                                // --- ALGORITHMS CONTENT ---
                                <div className="space-y-16">
                                    {/* Section 1: Definition */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '0ms' }}>
                                        <div className="text-center mb-8">
                                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
                                                What Is an <span className="text-indigo-600">Algorithm</span>?
                                            </h1>
                                            <div className="h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
                                        </div>

                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                                            <p className="text-xl text-slate-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                                                An algorithm is a <span className="font-bold text-indigo-600">step-by-step procedure</span> used to solve a problem or perform a task.
                                                It acts like a clear set of instructions that a computer (hardware or software) follows to reach a result.
                                            </p>

                                            {/* Recipe Analogy */}
                                            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl max-w-3xl mx-auto mb-10 shadow-sm relative overflow-hidden">
                                                <div className="absolute right-0 top-0 text-9xl text-indigo-100 opacity-50 -mr-8 -mt-8 pointer-events-none">
                                                    <i className="fa-solid fa-utensils"></i>
                                                </div>
                                                <p className="text-indigo-800 text-lg font-medium italic relative z-10">
                                                    <span className="text-2xl mr-3 not-italic">👉</span>
                                                    "Think of it as a recipe: the input is the ingredients, the instructions are the steps, and the output is the final dish."
                                                </p>
                                            </div>

                                            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Characteristics of a Good Algorithm</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {[
                                                    { title: 'Clear & Unambiguous', desc: 'Every instruction should be easy to understand and have only one interpretation.', icon: 'fa-list-check' },
                                                    { title: 'Well-Defined Inputs', desc: 'If inputs are required, they must be clearly specified.', icon: 'fa-right-to-bracket' },
                                                    { title: 'Well-Defined Outputs', desc: 'The expected result must be clearly defined before implementation.', icon: 'fa-right-from-bracket' },
                                                    { title: 'Finite Steps', desc: 'The algorithm must end after a limited number of steps—no infinite loops.', icon: 'fa-hourglass-end' },
                                                    { title: 'Feasible', desc: 'It should be practical and executable with current technology and resources.', icon: 'fa-wrench' },
                                                    { title: 'Language-Independent', desc: 'Written in plain logic. Produces the same output regardless of the programming language used.', icon: 'fa-globe' }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex flex-col items-start p-6 bg-slate-50 rounded-xl border border-slate-100 shadow-sm hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all duration-300 group">
                                                        <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 mb-4 text-xl group-hover:scale-110 transition-transform">
                                                            <i className={`fa-solid ${item.icon}`}></i>
                                                        </div>
                                                        <h4 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                                                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 2: Types of Algorithms (Table) */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '150ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Types of Algorithms</h2>
                                        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
                                                        <th className="p-4 border-b font-bold w-1/4">Type</th>
                                                        <th className="p-4 border-b font-bold w-1/2">Description</th>
                                                        <th className="p-4 border-b font-bold w-1/4">Example Use</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-600 text-sm">
                                                    {[
                                                        { type: 'Brute Force Algorithm', desc: 'Tries all possible solutions until the correct one is found.', ex: 'Password cracking, basic searching' },
                                                        { type: 'Recursive Algorithm', desc: 'Solves problems by calling itself repeatedly.', ex: 'Factorial, Fibonacci, Tree Traversal' },
                                                        { type: 'Sorting Algorithm', desc: 'Arranges data in a specific order.', ex: 'Quick Sort, Merge Sort, Bubble Sort' },
                                                        { type: 'Searching Algorithm', desc: 'Finds specific values in data.', ex: 'Binary Search, Linear Search' },
                                                        { type: 'Hashing Algorithm', desc: 'Maps data with keys for fast access.', ex: 'Databases, Caches' },
                                                        { type: 'Divide & Conquer', desc: 'Breaks problems into smaller parts, solves, then combines.', ex: 'Merge Sort, Quick Sort' },
                                                        { type: 'Dynamic Programming', desc: 'Stores previous results to avoid repeated calculations.', ex: 'Fibonacci DP, Knapsack Problem' },
                                                        { type: 'Greedy Algorithm', desc: 'Makes the best immediate choice at each step.', ex: 'Minimum Spanning Tree, Huffman Coding' },
                                                        { type: 'Backtracking Algorithm', desc: 'Tries building a solution and backtracks when it fails.', ex: 'Sudoku Solver, N-Queens' },
                                                        { type: 'Randomized Algorithm', desc: 'Uses randomness to make decisions.', ex: 'Randomized QuickSort, Hashing' }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                                            <td className="p-4 font-bold text-indigo-700">{row.type}</td>
                                                            <td className="p-4">{row.desc}</td>
                                                            <td className="p-4 font-mono text-xs bg-slate-50 rounded">{row.ex}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Section 3: How to Design */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '250ms' }}>
                                        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
                                            <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"></div>
                                            <h2 className="text-3xl font-bold mb-8 relative z-10 text-center">How to Design an Algorithm</h2>

                                            <div className="relative z-10 max-w-4xl mx-auto">
                                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
                                                    {/* Connecting Line (Desktop) */}
                                                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/20 -z-10 transform -translate-y-1/2"></div>

                                                    {[
                                                        { step: '1', text: 'Define Problem', icon: 'fa-circle-question' },
                                                        { step: '2', text: 'Consider Constraints', icon: 'fa-ruler-combined' },
                                                        { step: '3', text: 'Identify Inputs', icon: 'fa-file-import' },
                                                        { step: '4', text: 'Define Output', icon: 'fa-file-export' },
                                                        { step: '5', text: 'Create Logic', icon: 'fa-brain' },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex flex-col items-center gap-3 bg-slate-900 p-2 md:bg-transparent">
                                                            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl shadow-lg ring-4 ring-slate-800">
                                                                <i className={`fa-solid ${item.icon}`}></i>
                                                            </div>
                                                            <span className="font-bold text-center text-sm md:text-base">{item.text}</span>
                                                            <span className="text-xs text-slate-400">Step {item.step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 4: Advantages & Disadvantages */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '350ms' }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Advantages */}
                                            <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100">
                                                <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                                                    <i className="fa-solid fa-thumbs-up text-emerald-500 text-2xl"></i> Advantages
                                                </h3>
                                                <ul className="space-y-4">
                                                    {[
                                                        'Simple to understand',
                                                        'Provides a clear step-by-step solution',
                                                        'Makes converting logic into code easier',
                                                        'Improves clarity and planning before coding'
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-emerald-900">
                                                            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Disadvantages */}
                                            <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100">
                                                <h3 className="text-xl font-bold text-rose-800 mb-6 flex items-center gap-3">
                                                    <i className="fa-solid fa-thumbs-down text-rose-500 text-2xl"></i> Disadvantages
                                                </h3>
                                                <ul className="space-y-4">
                                                    {[
                                                        'Time-consuming to write for complex problems',
                                                        'Hard to represent loops or conditionals visually',
                                                        'Difficult to understand for large or complex logic'
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-rose-900">
                                                            <i className="fa-solid fa-xmark text-rose-500 mt-1"></i>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 5: Real World Use Cases */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '400ms' }}>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Where Algorithms Are Used in Real Life</h2>
                                        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
                                                        <th className="p-4 border-b font-bold">Real-World Use</th>
                                                        <th className="p-4 border-b font-bold">Algorithm Examples</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-600 text-sm">
                                                    {[
                                                        { use: 'Search Engines (Google)', ex: 'PageRank, Graph Algorithms' },
                                                        { use: 'Navigation Systems', ex: 'Dijkstra’s, A* Pathfinding' },
                                                        { use: 'AI & Machine Learning', ex: 'Optimization, Dynamic Programming' },
                                                        { use: 'Social Media Recommendations', ex: 'Hashing, Graph Algorithms' },
                                                        { use: 'E-commerce Filtering', ex: 'Sorting & Searching' },
                                                        { use: 'Cybersecurity & Encryption', ex: 'Hashing, RSA Algorithms' },
                                                        { use: 'Finance & Stock Trading', ex: 'Greedy Algorithms, Dynamic Programming' }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                                            <td className="p-4 font-medium text-slate-800">{row.use}</td>
                                                            <td className="p-4 text-indigo-600 font-medium">{row.ex}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Section 6: Understanding Algorithms (Example) */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '450ms' }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                            <div>
                                                <h2 className="text-3xl font-bold text-slate-800 mb-4">Understanding Algorithm Logic</h2>
                                                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                                    Algorithms determine how efficiently a program runs. A good algorithm solves a problem quickly and uses minimal resources.
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <i className="fa-solid fa-gauge-high"></i>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-800">Speed (Time Complexity)</h4>
                                                            <p className="text-sm text-slate-500">How fast does it run?</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <i className="fa-solid fa-hard-drive"></i>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-800">Memory (Space Complexity)</h4>
                                                            <p className="text-sm text-slate-500">How much RAM does it need?</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
                                                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                                    <i className="fa-solid fa-code"></i> Algorithm Example
                                                </h3>
                                                <div className="font-mono text-sm space-y-2 text-slate-300">
                                                    <p><span className="text-emerald-400">function</span> <span className="text-yellow-300">findMax</span>(arr) {'{'}</p>
                                                    <p className="pl-4">let max = arr[0];</p>
                                                    <p className="pl-4"><span className="text-rose-400">for</span> (let i=1; i &lt; arr.length; i++) {'{'}</p>
                                                    <p className="pl-8"><span className="text-rose-400">if</span> (arr[i] &gt; max) {'{'}</p>
                                                    <p className="pl-12">max = arr[i];</p>
                                                    <p className="pl-8">{'}'}</p>
                                                    <p className="pl-4">{'}'}</p>
                                                    <p className="pl-4"><span className="text-emerald-400">return</span> max;</p>
                                                    <p>{'}'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 7: Why Algorithms Matter Summary */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '500ms' }}>
                                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center relative overflow-hidden">
                                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>

                                            <h2 className="text-3xl font-bold mb-6 relative z-10">Why Algorithms Matter in DSA</h2>
                                            <p className="text-indigo-100 mb-8 text-lg relative z-10 max-w-3xl mx-auto">
                                                Algorithms work hand-in-hand with Data Structures.
                                                <br />
                                                <span className="font-bold text-white">Data structures store the data — algorithms process it efficiently.</span>
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-4xl mx-auto">
                                                <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                                                    <h4 className="text-rose-300 font-bold mb-4 text-lg">Without Proper Algorithms</h4>
                                                    <ul className="space-y-2 text-left text-sm">
                                                        <li className="flex gap-2"><i className="fa-solid fa-xmark text-rose-400 mt-1"></i> Even fast hardware becomes slow</li>
                                                        <li className="flex gap-2"><i className="fa-solid fa-xmark text-rose-400 mt-1"></i> Data structures become inefficient</li>
                                                        <li className="flex gap-2"><i className="fa-solid fa-xmark text-rose-400 mt-1"></i> Applications fail to scale</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                                                    <h4 className="text-emerald-300 font-bold mb-4 text-lg">With Strong Design</h4>
                                                    <ul className="space-y-2 text-left text-sm">
                                                        <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-400 mt-1"></i> Faster execution times</li>
                                                        <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-400 mt-1"></i> Lower memory usage</li>
                                                        <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-400 mt-1"></i> Scalability for large data</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Footer Image Text */}
                                    <section className="animate-on-load opacity-0" style={{ animationDelay: '550ms' }}>
                                        <div className="w-full py-24 flex justify-center items-center overflow-hidden relative">
                                            <h1 className="text-[3rem] sm:text-[5rem] md:text-[7rem] font-black tracking-tighter text-slate-900 uppercase select-none leading-none text-center px-4 flex flex-wrap justify-center gap-x-4">
                                                {/* ALGORITHMS */}
                                                <span className="flex">
                                                    {"ALGORITHMS".split("").map((char, i) => (
                                                        <span key={i} className="cursor-default transition-all duration-300 hover:text-indigo-500 hover:-translate-y-2 hover:scale-110 inline-block">
                                                            {char}
                                                        </span>
                                                    ))}
                                                </span>
                                            </h1>
                                        </div>
                                    </section>
                                </div>
                            )}

                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center h-full transition-colors duration-300 bg-slate-50 text-slate-400">
                        <div className="text-center">
                            <i className="fa-solid fa-hammer text-4xl mb-4"></i>
                            <p>This module is under construction.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {/* Show Login/Signup if not logged in */}
            {!isLoggedIn ? (
                authView === 'login' ? (
                    <Login
                        onLoginSuccess={handleLoginSuccess}
                        onSwitchToSignup={() => setAuthView('signup')}
                    />
                ) : (
                    <Signup
                        onSignupSuccess={handleSignupSuccess}
                        onSwitchToLogin={() => setAuthView('login')}
                    />
                )
            ) : (
                <>
                    {/* Notification Container */}
                    <div className="fixed top-4 right-4 z-[100] space-y-3">
                        {notifications.map(notification => (
                            <Notification
                                key={notification.id}
                                type={notification.type}
                                title={notification.title}
                                message={notification.message}
                                action={notification.action ? {
                                    label: notification.action.label,
                                    onClick: () => {
                                        notification.action!.onClick();
                                        navigateToSettings();
                                    }
                                } : undefined}
                                onClose={() => removeNotification(notification.id)}
                            />
                        ))}
                    </div>

                    <div className="flex h-screen bg-slate-50 overflow-hidden">
                        <Sidebar
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            isCollapsed={isSidebarCollapsed}
                            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        />

                        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} overflow-hidden h-full relative transition-all duration-300`}>
                            {renderContent()}
                        </main>

                        <ChatInterface />
                    </div>
                </>
            )}

            <style>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
            `}</style>
        </AppContext.Provider>
    );
};

export default App;
