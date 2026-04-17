import { MenuItem, MENU_DATA } from "../data/menuData";

interface UserSelections {
  mood?: string;
  taste?: string;
  flavor?: string;
  preferences: string[];
}

interface RecommendationResult {
  mainDish: MenuItem;
  side?: MenuItem;
  drink?: MenuItem;
  dessert?: MenuItem;
  message: string;
}

export function getRecommendation(selections: UserSelections): RecommendationResult {
  const { mood, taste, flavor, preferences } = selections;

  // 根據忌口篩選可用的餐點
  let availableMains = MENU_DATA.filter(item => 
    item.cat === 'main' || item.cat === 'set'
  );

  // 處理忌口選項
  if (preferences.includes("素食")) {
    availableMains = availableMains.filter(item => 
      item.name.includes("素") || item.name.includes("蔬菜") || item.name.includes("蘑菇")
    );
  }
  if (preferences.includes("不吃牛肉")) {
    availableMains = availableMains.filter(item => 
      !item.name.includes("牛")
    );
  }
  if (preferences.includes("海鮮")) {
    availableMains = availableMains.filter(item => 
      item.name.includes("鯛魚") || item.name.includes("鯖魚") || item.name.includes("鮪魚")
    );
  }

  let mainDish: MenuItem;
  let message = "";

  // 根據心情選擇主餐
  if (mood === "很棒") {
    message = "今天心情不錯呢！為您推薦這道精緻主餐，搭配飯後甜點，讓美好的一天更加完美！";
    
    if (taste === "重口味") {
      mainDish = availableMains.find(item => item.name.includes("番茄雞腿排")) || availableMains[0];
    } else if (taste === "清淡") {
      mainDish = availableMains.find(item => item.name.includes("檸檬香草烤鯖魚")) || availableMains[0];
    } else {
      mainDish = availableMains.find(item => item.name.includes("蒜香白酒雞胸")) || availableMains[0];
    }
  } else if (mood === "煩躁") {
    message = "感覺有點煩躁啊...這道料理濃郁的風味能夠舒緩情緒，飯後附有今日限定的甜點，可以期待一下喔！";
    
    if (taste === "重口味" && flavor === "偏鹹") {
      mainDish = availableMains.find(item => item.name.includes("番茄雞腿排")) || availableMains[0];
    } else if (preferences.includes("海鮮")) {
      mainDish = availableMains.find(item => item.name.includes("香蒜鮪魚")) || availableMains[0];
    } else {
      mainDish = availableMains.find(item => item.name.includes("南瓜奶油雞肉")) || availableMains[0];
    }
  } else if (mood === "有點低落") {
    message = "今天聽起來有點低落...為您推薦這道溫暖的餐點，搭配甜點讓心情好轉起來！";
    
    if (flavor === "偏甜") {
      mainDish = availableMains.find(item => item.name.includes("南瓜奶油雞肉")) || availableMains[0];
    } else if (preferences.includes("素食")) {
      mainDish = availableMains.find(item => item.name.includes("香料咖哩蔬菜")) || availableMains[0];
    } else {
      mainDish = availableMains.find(item => item.name.includes("奶油蘑菇")) || availableMains[0];
    }
  } else if (mood === "壓力大") {
    message = "最近壓力很大吧？這道料理能帶來療癒感，飯後的甜點會是最好的慰藉！";
    
    if (taste === "重口味") {
      mainDish = availableMains.find(item => item.name.includes("香煎鯛魚")) || availableMains[0];
    } else if (flavor === "偏甜" || flavor === "平衡") {
      mainDish = availableMains.find(item => item.name.includes("南瓜奶油雞肉")) || availableMains[0];
    } else {
      mainDish = availableMains.find(item => item.name.includes("蒜香白酒雞胸")) || availableMains[0];
    }
  } else {
    message = "根據您的選擇，為您推薦這道特色餐點，飯後附有今日限定的甜點，可以期待一下喔！";
    mainDish = availableMains[0];
  }

  // 選擇配菜
  const salads = MENU_DATA.filter(item => item.cat === 'salad');
  const side = salads[Math.floor(Math.random() * salads.length)];

  // 選擇飲料
  let drinks = MENU_DATA.filter(item => item.cat === 'drink');
  let drink: MenuItem;
  
  if (mood === "壓力大" || mood === "有點低落") {
    drink = drinks.find(item => item.name.includes("情緒特調")) || drinks[0];
  } else if (flavor === "偏甜") {
    drink = drinks.find(item => item.name.includes("鮮奶茶") || item.name.includes("百香果")) || drinks[0];
  } else {
    drink = drinks.find(item => item.name.includes("咖啡拿鐵")) || drinks[0];
  }

  // 選擇甜點
  const desserts = MENU_DATA.filter(item => item.cat === 'dessert');
  let dessert: MenuItem;
  
  if (mood === "有點低落" || mood === "壓力大") {
    dessert = desserts.find(item => item.name.includes("熱布朗尼")) || desserts[0];
  } else if (flavor === "偏甜") {
    dessert = desserts.find(item => item.name.includes("藍莓乳酪蛋糕")) || desserts[0];
  } else {
    dessert = desserts.find(item => item.name.includes("檸檬塔")) || desserts[0];
  }

  return {
    mainDish,
    side,
    drink,
    dessert,
    message,
  };
}
