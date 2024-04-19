-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306:3306
-- Generation Time: Apr 19, 2024 at 03:34 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vhack`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounting`
--

CREATE TABLE `accounting` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `user_id` int(255) DEFAULT NULL,
  `counterparty` varchar(200) DEFAULT '',
  `category` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounting`
--

INSERT INTO `accounting` (`id`, `date`, `user_id`, `counterparty`, `category`, `description`, `type`, `amount`) VALUES
(1, '2023-06-12', 1, 'Aman Shop', 'Livestock Sales', 'Sale of cattle', 'Income', '223.00'),
(2, '2023-05-26', 2, 'Aman Shop', 'Gardening', 'Purchase of seeds and gardening tools', 'Expense', '500.00'),
(3, '2023-05-25', 3, 'Aman Shop', 'Resale Items', 'Resale of farm equipment', 'Income', '83.88'),
(4, '2023-05-25', 1, 'Aman Shop', 'Resale Items', 'Resale of farm tools', 'Income', '60.00'),
(5, '2023-04-13', 2, 'Aman Shop', 'Miscellaneous Income', 'Miscellaneous income source', 'Income', '860.00'),
(6, '2023-07-18', 3, 'Aman Shop', 'Maintenance', 'Repair of farming equipment', 'Expense', '120.00'),
(7, '2023-07-22', 1, 'Aman Shop', 'Transportation', 'Transportation expenses for farm produce', 'Expense', '65.50'),
(8, '2023-08-05', 2, 'Aman Shop', 'Fertilizers', 'Purchase of fertilizers for crops', 'Expense', '300.00'),
(9, '2023-08-15', 3, 'Aman Shop', 'Rent', 'Payment for renting farmland', 'Expense', '700.00'),
(10, '2023-08-20', 1, 'Aman Shop', 'Utilities', 'Payment for farm utilities', 'Expense', '150.00');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `CollectionID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `PostID` int(11) DEFAULT NULL,
  `CollectionDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`CollectionID`, `UserID`, `PostID`, `CollectionDate`) VALUES
(1, 2, 1, '2024-04-13 11:05:32'),
(2, 4, 2, '2024-04-13 11:05:32'),
(3, 6, 3, '2024-04-13 11:05:32'),
(4, 8, 4, '2024-04-13 11:05:32'),
(5, 10, 5, '2024-04-13 11:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `CommentID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `PostID` int(11) DEFAULT NULL,
  `Content` text NOT NULL,
  `CommentDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`CommentID`, `UserID`, `PostID`, `Content`, `CommentDate`) VALUES
(1, 2, 1, 'Beautiful picture!', '2024-04-13 11:05:32'),
(2, 3, 1, 'Amazing caption!', '2024-04-13 11:05:32'),
(3, 4, 2, 'Looks delicious!', '2024-04-13 11:05:32'),
(4, 5, 2, 'Great company!', '2024-04-13 11:05:32'),
(5, 6, 3, 'I love that book too!', '2024-04-13 11:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `crop`
--

CREATE TABLE `crop` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crop`
--

INSERT INTO `crop` (`id`, `name`, `image`, `description`) VALUES
(1, 'Blueberry', 'blueberry.png', 'A small round berry with a bluish-purple color.'),
(2, 'Tomato', 'tomato.png', 'A red or yellowish fruit with a juicy interior and edible seeds.'),
(3, 'Carrot', 'carrot.png', 'A long orange vegetable with a sweet taste and high beta-carotene content.'),
(4, 'Apple', 'apple.png', 'A round fruit with a crunchy texture and various colors like red, green, or yellow.'),
(5, 'Banana', 'banana.png', 'A curved yellow fruit with a soft flesh and sweet flavor.'),
(6, 'Broccoli', 'broccoli.png', 'A green vegetable with a dense head of small flower buds.');

-- --------------------------------------------------------

--
-- Table structure for table `encyclopedia`
--

CREATE TABLE `encyclopedia` (
  `encyclopedia_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `scientific_name` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encyclopedia`
--

INSERT INTO `encyclopedia` (`encyclopedia_id`, `name`, `scientific_name`, `image`) VALUES
(1, 'Wheat', 'Triticum spp.', 'wheat.png'),
(2, 'Corn', 'Zea mays', 'corn.png'),
(3, 'Barley', 'Hordeum vulgare', 'barley.png'),
(4, 'Oats', 'Avena sativa', 'oats.png'),
(5, 'Tomato', 'Solanum lycopersicum', 'tomato.png'),
(6, 'Potato', 'Solanum tuberosum', 'potato.png'),
(7, 'Carrot', 'Daucus carota', 'carrot.png'),
(8, 'Lettuce', 'Lactuca sativa', 'lettuce.png'),
(9, 'Bell Pepper', 'Capsicum annuum', 'bell_pepper.png'),
(10, 'Strawberry', 'Fragaria × ananassa', 'strawberry.png'),
(11, 'Soybean', 'Glycine max', 'soybean.png'),
(12, 'Bean', 'Phaseolus spp.', 'bean.png'),
(13, 'Sunflower', 'Helianthus annuus', 'sunflower.png'),
(14, 'Peanut', 'Arachis hypogaea', 'peanut.png');

-- --------------------------------------------------------

--
-- Table structure for table `encyclopedia_cares`
--

CREATE TABLE `encyclopedia_cares` (
  `care_id` int(11) NOT NULL,
  `encyclopedia_id` int(11) NOT NULL,
  `care` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encyclopedia_cares`
--

INSERT INTO `encyclopedia_cares` (`care_id`, `encyclopedia_id`, `care`, `description`) VALUES
(1, 1, 'Watering', 'Wheat generally requires consistent watering, especially during the critical stages of germination, tillering, and grain filling. It\'s essential to keep the soil moist but not waterlogged to support optimal growth and yield.'),
(2, 1, 'Fertilizing', 'Applying nitrogen-rich fertilizers at the right stages of wheat growth, such as during tillering and stem elongation, can significantly enhance yield and grain quality. However, it\'s crucial to avoid excessive nitrogen application, which can lead to lodging and reduced grain quality.'),
(3, 1, 'Disease Management', 'Wheat is susceptible to various diseases such as rusts, powdery mildew, and Fusarium head blight. Implementing integrated disease management practices, including crop rotation, resistant varieties, and timely fungicide applications, can help mitigate these diseases and protect yield.'),
(4, 1, 'Pest Control', 'Common pests affecting wheat include aphids, cereal leaf beetles, and Hessian flies. Monitoring fields regularly and employing cultural practices like crop rotation and proper residue management can help reduce pest pressure. In severe cases, insecticide applications may be necessary.'),
(5, 1, 'Harvesting', 'Harvesting wheat at the right moisture content is critical to prevent grain losses and maintain quality. Generally, wheat is harvested when the moisture content is between 13% and 18%, depending on the storage conditions and intended use. Using proper harvesting equipment and techniques ensures efficient harvesting and minimal grain damage.'),
(6, 2, 'Fertilizing', 'Corn plants benefit from regular fertilization, especially nitrogen-rich fertilizers. Apply fertilizer when the plants are knee-high and again when they begin to tassel.'),
(7, 2, 'Weeding', 'Keep the area around corn plants free from weeds, as they can compete for nutrients and water. Hand-weeding is often the best method to avoid damaging corn roots.'),
(8, 2, 'Mulching', 'Mulching around corn plants helps to conserve soil moisture, suppress weeds, and regulate soil temperature. Use organic mulches like straw or shredded leaves.'),
(9, 2, 'Pest Control', 'Monitor for common corn pests such as corn earworms, cutworms, and corn borers. Use insecticides sparingly and consider biological control methods like introducing natural predators.'),
(10, 2, 'Harvesting', 'Harvest corn when the kernels are plump and milky, typically about 20 days after the silks appear. Peel back the husk and press a kernel with your fingernail; if it releases milky liquid, it\'s ready to harvest.'),
(11, 3, 'Soil Preparation', 'Barley thrives in well-draining soil with a pH between 6.0 and 7.5. Before planting, work the soil to remove debris and ensure good aeration.'),
(12, 3, 'Fertilization', 'Barley requires nitrogen-rich fertilizer for optimal growth. Apply a balanced fertilizer at planting time, and consider side-dressing with additional nitrogen during the growing season.'),
(13, 3, 'Weed Control', 'Keep barley fields free from weeds, especially during the initial growth stages. Weeds compete with barley for nutrients, water, and sunlight, which can reduce yield and quality.'),
(14, 3, 'Disease Management', 'Barley is susceptible to various diseases such as powdery mildew, leaf rust, and barley yellow dwarf virus. Implement crop rotation, use disease-resistant varieties, and apply fungicides as necessary to prevent and manage diseases.'),
(15, 3, 'Harvesting', 'Harvest barley when the grains are fully developed but still slightly moist. Use a combine harvester set to the appropriate settings to efficiently harvest the crop while minimizing grain loss and damage.'),
(16, 4, 'Soil Preparation', 'Oats prefer well-drained, fertile soil. Before planting, ensure the soil is loosened and free of weeds.'),
(17, 4, 'Fertilizing', 'Apply a balanced fertilizer high in nitrogen before planting oats. Additional nitrogen may be needed during the growing season.'),
(18, 4, 'Harvesting', 'Harvest oats when the kernels are in the milk stage. Cut the stalks and allow them to dry in the field for a few days before threshing.'),
(19, 4, 'Pest Control', 'Keep an eye out for common oat pests such as aphids, armyworms, and wireworms. Use appropriate pesticides if infestations occur.'),
(20, 4, 'Disease Management', 'Prevent diseases like powdery mildew and rust by ensuring good air circulation around oat plants. Apply fungicides preventatively if necessary.'),
(21, 5, 'Sunlight', 'Tomatoes require full sunlight to thrive. Choose a sunny spot in your garden where they can receive at least 6-8 hours of direct sunlight.'),
(22, 5, 'Pruning', 'Regular pruning helps to promote air circulation and reduce the risk of disease in tomato plants. Remove suckers and any damaged or yellowing leaves.'),
(23, 5, 'Support', 'Tomato plants benefit from support as they grow. Use stakes, cages, or trellises to support the plants and keep the fruit off the ground, reducing the risk of rot and pests.'),
(24, 5, 'Fertilizing', 'Tomatoes are heavy feeders and require regular fertilization throughout the growing season. Use a balanced fertilizer high in potassium to promote fruit development.'),
(25, 5, 'Watering', 'Tomatoes need consistent watering to prevent blossom end rot and cracking. Water deeply, ensuring the soil is evenly moist but not waterlogged. Aim to water at the base of the plant to keep the foliage dry and reduce the risk of disease.'),
(26, 6, 'Soil Preparation', 'Potatoes prefer loose, well-drained soil. Prior to planting, amend the soil with organic matter such as compost to improve soil structure and fertility.'),
(27, 6, 'Hilling', 'As potato plants grow, mound soil around the base of the stems to cover the lower leaves. This encourages tuber development and prevents them from turning green due to exposure to sunlight.'),
(28, 6, 'Fertilizing', 'Fertilize potato plants with a balanced fertilizer high in potassium, such as a 5-10-10 blend, when planting. Avoid excessive nitrogen, which can promote foliage growth over tuber development.'),
(29, 6, 'Weed Control', 'Keep the area around potato plants free of weeds, as they compete for nutrients and water. Mulching can help suppress weed growth and retain soil moisture.'),
(30, 6, 'Harvesting', 'Potatoes are ready to harvest when the tops of the plants have died back. Use a shovel or garden fork to gently loosen the soil and harvest potatoes. Avoid damaging the tubers during harvest.'),
(31, 7, 'Soil Preparation', 'Carrots prefer loose, well-draining soil. Prior to planting, prepare the soil by removing rocks and debris, and mix in compost or well-aged manure to improve soil texture and fertility.'),
(32, 7, 'Thinning', 'After carrot seedlings have emerged, thin them to ensure proper spacing. Overcrowded carrots will result in smaller roots. Thin to about 2-3 inches apart.'),
(33, 7, 'Weeding', 'Keep the carrot bed free from weeds, as they compete with carrots for nutrients and water. Regularly remove weeds by hand or with a hoe, being careful not to disturb the carrot seedlings.'),
(34, 7, 'Mulching', 'Apply a layer of mulch around carrot plants to help retain soil moisture, regulate soil temperature, and suppress weed growth. Use straw, grass clippings, or compost as mulch, and apply it after the soil has warmed in spring.'),
(35, 7, 'Pest Control', 'Protect carrot plants from common pests such as carrot rust flies and carrot weevils. Use row covers to prevent adult flies from laying eggs, and apply organic insecticides or beneficial nematodes as needed to control larvae and adult pests.'),
(36, 8, 'Watering', 'Lettuce needs regular watering to keep the soil consistently moist. Ensure that the soil is not allowed to dry out completely, especially during hot weather, as this can cause the lettuce to become bitter and bolt prematurely.'),
(37, 8, 'Temperature', 'Lettuce prefers cool temperatures between 45°F to 75°F (7°C to 24°C). Provide shade or use mulch to keep the soil cool during warmer weather, and consider planting in a location that receives partial shade in hotter climates.'),
(38, 8, 'Fertilization', 'Lettuce benefits from a balanced fertilizer applied every 3-4 weeks throughout the growing season. Use a nitrogen-rich fertilizer to promote healthy leaf growth, but avoid excessive fertilization which can lead to bitter-tasting leaves.'),
(39, 8, 'Pest Control', 'Protect lettuce from common pests such as aphids, slugs, and snails. Regularly inspect plants for signs of pest damage, and consider using organic pest control methods such as companion planting or applying insecticidal soap.'),
(40, 8, 'Harvesting', 'Harvest lettuce leaves when they reach the desired size, typically when they are 4-6 inches long. Use a sharp knife to cut the leaves just above the soil level, leaving the plant\'s center intact to encourage regrowth for multiple harvests throughout the season.'),
(41, 9, 'Watering', 'Bell peppers require regular watering, especially during dry spells. Keep the soil consistently moist but not waterlogged to avoid root rot.'),
(42, 9, 'Fertilizing', 'Fertilize bell peppers every two to three weeks with a balanced fertilizer high in potassium to promote fruit development. Avoid excessive nitrogen, which can result in lush foliage but fewer fruits.'),
(43, 9, 'Pruning', 'Prune bell pepper plants to remove any dead or diseased foliage and to improve air circulation. Pinch off the growing tips to encourage bushier growth and more fruit production.'),
(44, 9, 'Support', 'Provide support for bell pepper plants, especially when they start to produce fruits. Stake or cage the plants to prevent them from toppling over under the weight of the peppers.'),
(45, 9, 'Pest and Disease Control', 'Monitor bell pepper plants regularly for signs of pests such as aphids, whiteflies, and caterpillars, as well as diseases like blossom end rot and bacterial spot. Use organic or chemical control methods as needed to keep pests and diseases in check.'),
(46, 10, 'Sunlight', 'Strawberries require full sunlight to produce the best fruit. Ensure they receive at least 6-8 hours of direct sunlight daily.'),
(47, 10, 'Soil', 'Plant strawberries in well-draining, slightly acidic soil with a pH between 5.5 and 6.5. Amend the soil with organic matter like compost for optimal growth.'),
(48, 10, 'Fertilization', 'Fertilize strawberries with a balanced fertilizer high in potassium and phosphorus, but low in nitrogen. Apply fertilizer sparingly to avoid burning the plants.'),
(49, 10, 'Mulching', 'Mulch around strawberry plants to suppress weeds, retain soil moisture, and prevent fruit from touching the ground. Use straw, pine needles, or shredded leaves as mulch.'),
(50, 10, 'Pest and Disease Control', 'Regularly inspect strawberry plants for pests like aphids, slugs, and snails. Use organic pest control methods or pesticides labeled for use on strawberries if necessary. Watch for diseases like powdery mildew and gray mold, and promptly remove infected plant parts.'),
(51, 11, 'Planting Depth', 'Soybeans should be planted at a depth of about 1 to 1.5 inches. Planting too shallow can expose seeds to pests and planting too deep can hinder germination.'),
(52, 11, 'Fertilization', 'Soybeans benefit from balanced fertilization, especially with nitrogen, phosphorus, and potassium. Apply fertilizer according to soil test recommendations or general guidelines.'),
(53, 11, 'Weed Control', 'Keep soybean fields free from weeds, especially during the early growth stages when soybean plants are establishing themselves. Consider pre-emergence and post-emergence herbicide applications.'),
(54, 11, 'Pest Management', 'Monitor soybean fields regularly for pests such as aphids, bean leaf beetles, and soybean cyst nematodes. Implement integrated pest management strategies including cultural, biological, and chemical controls as necessary.'),
(55, 11, 'Harvesting', 'Harvest soybeans when the pods are fully mature and have turned brown. Use a combine harvester set to the appropriate settings for soybeans to minimize seed damage and loss during harvesting.'),
(56, 12, 'Planting Depth', 'Beans should be planted at a depth of approximately 1 to 1.5 inches (2.5 to 3.8 cm) in the soil. Planting too deep or too shallow can affect germination and growth.'),
(57, 12, 'Spacing', 'Space bean seeds or seedlings approximately 2 to 4 inches (5 to 10 cm) apart in rows that are about 18 to 24 inches (46 to 61 cm) apart. Proper spacing allows the plants to receive adequate sunlight and airflow, promoting healthy growth.'),
(58, 12, 'Support', 'Many varieties of beans benefit from support to help them climb. Provide trellises, stakes, or other support structures for climbing varieties to keep the plants off the ground, reducing the risk of disease and making harvesting easier.'),
(59, 12, 'Mulching', 'Applying a layer of mulch around bean plants helps conserve soil moisture, suppress weeds, and maintain even soil temperatures. Organic mulches like straw or shredded leaves are ideal for beans.'),
(60, 12, 'Harvesting', 'Beans should be harvested when the pods are firm, crisp, and fully developed but before they become tough or begin to bulge with the formation of seeds. Harvest regularly to encourage continued production; beans left on the plant too long can reduce future yields.'),
(61, 13, 'Sunlight Requirements', 'Sunflowers require full sun, meaning at least 6-8 hours of direct sunlight per day for optimal growth and flowering.'),
(62, 13, 'Soil Conditions', 'Sunflowers prefer well-draining soil with a pH between 6.0 and 7.5. They can tolerate various soil types but thrive in nutrient-rich, loamy soil.'),
(63, 13, 'Spacing', 'When planting sunflowers, space the seeds or transplants at least 6-24 inches apart, depending on the variety and expected size of the mature plants.'),
(64, 13, 'Watering', 'Sunflowers need regular watering, especially during dry periods, but they are relatively drought-tolerant once established. Avoid overwatering as it can lead to root rot.'),
(65, 13, 'Support', 'Tall varieties of sunflowers may require support such as stakes or trellises to prevent them from bending or toppling over in windy conditions. Ensure the support is sturdy and installed early in the plant\'s growth to avoid damaging the roots later on.'),
(66, 14, 'Sunlight', 'Peanut plants need full sunlight to thrive. Ensure they receive at least 6-8 hours of direct sunlight per day for optimal growth and yield.'),
(67, 14, 'Soil', 'Peanuts prefer well-draining, sandy soil with a pH between 5.8 and 6.2. Amend soil with organic matter like compost to improve drainage and fertility.'),
(68, 14, 'Fertilization', 'Fertilize peanut plants with a balanced fertilizer, such as 10-10-10, at planting time and again when the plants begin to flower. Avoid excess nitrogen, which can promote leafy growth over pod development.'),
(69, 14, 'Pest Control', 'Monitor peanut plants regularly for pests such as aphids, thrips, and leafhoppers. Use insecticidal soap or neem oil to control infestations, and remove any diseased or damaged plant parts promptly to prevent spread.'),
(70, 14, 'Harvesting', 'Peanuts are ready to harvest when the leaves yellow and the pods mature underground. Carefully dig up the plants, shake off excess soil, and allow the pods to dry in a warm, well-ventilated area for 1-2 weeks before removing the nuts from the shells.');

-- --------------------------------------------------------

--
-- Table structure for table `encyclopedia_disease`
--

CREATE TABLE `encyclopedia_disease` (
  `disease_id` int(11) NOT NULL,
  `encyclopedia_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `solution` text NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encyclopedia_disease`
--

INSERT INTO `encyclopedia_disease` (`disease_id`, `encyclopedia_id`, `name`, `description`, `solution`, `image`) VALUES
(1, 1, 'Wheat Rust', 'Wheat rust is a fungal disease that affects wheat plants, causing orange or reddish-brown pustules on leaves, stems, and spikes.', 'To control wheat rust, plant resistant wheat varieties and apply fungicides at the first sign of infection. Practice crop rotation and remove infected plant debris to reduce disease pressure.', 'wheat_rust.png'),
(2, 1, 'Wheat Powdery Mildew', 'Wheat powdery mildew is a fungal disease characterized by white powdery spots on the leaves, which can lead to reduced photosynthesis and yield loss.', 'To manage wheat powdery mildew, plant resistant varieties, provide adequate spacing between plants for air circulation, and apply fungicides preventatively.', 'wheat_powdery_mildew.png'),
(3, 1, 'Wheat Septoria Leaf Blotch', 'Septoria leaf blotch is a fungal disease that causes dark brown or tan lesions with yellow halos on wheat leaves, eventually leading to premature defoliation.', 'To control wheat septoria leaf blotch, use fungicides, practice crop rotation, and ensure good field sanitation by removing crop debris.', 'wheat_septoria_leaf_blotch.png'),
(4, 1, 'Wheat Fusarium Head Blight', 'Fusarium head blight, also known as scab, is a fungal disease that affects wheat spikes, causing premature bleaching and shriveling of grains.', 'To manage wheat fusarium head blight, plant resistant varieties, avoid planting in fields with a history of the disease, and apply fungicides at flowering.', 'wheat_fusarium_head_blight.png'),
(5, 1, 'Wheat Stagonospora Nodorum Blotch', 'Stagonospora nodorum blotch is a fungal disease of wheat characterized by oval-shaped lesions with dark centers and yellow halos on leaves.', 'To prevent wheat stagonospora nodorum blotch, use crop rotation, plant resistant varieties, and apply fungicides when necessary.', 'wheat_stagonospora_nodorum_blotch.png'),
(6, 2, 'Corn Smut', 'Corn smut is a fungal disease that causes large, swollen, grayish-black galls on corn ears, reducing yield and quality.', 'To control corn smut, remove and destroy infected plants. Practice crop rotation and use disease-resistant corn varieties.', 'corn_smutf.png'),
(7, 2, 'Corn Leaf Blight', 'Corn leaf blight is a fungal disease that causes brown lesions on corn leaves, leading to reduced photosynthesis and yield.', 'To manage corn leaf blight, apply fungicides and practice crop rotation. Planting resistant corn varieties can also help prevent disease spread.', 'corn_leaf_blight.png'),
(8, 2, 'Corn Rust', 'Corn rust is a fungal disease characterized by orange-brown pustules on corn leaves, reducing plant vigor and yield.', 'To control corn rust, use fungicides and practice good field sanitation. Planting early-maturing corn varieties and maintaining proper spacing can also help minimize disease spread.', 'corn_rust.png'),
(9, 2, 'Corn Stalk Rot', 'Corn stalk rot is a fungal disease that causes the decay of corn stalks, leading to lodging and yield losses.', 'To manage corn stalk rot, improve soil drainage and avoid excessive nitrogen fertilization. Planting resistant corn hybrids and practicing crop rotation can also help reduce disease incidence.', 'corn_stalk_rot.png'),
(10, 2, 'Corn Ear Rots', 'Corn ear rots are fungal diseases that cause mold growth on corn ears, reducing grain quality and posing health risks.', 'To control corn ear rots, harvest corn at the appropriate moisture level and ensure proper storage conditions. Implementing crop rotation and using fungicide-treated seeds can also help prevent disease outbreaks.', 'corn_ear_rots.png'),
(11, 3, 'Barley Powdery Mildew', 'Barley powdery mildew is a fungal disease that appears as white powdery patches on barley leaves, affecting plant health and yield.', 'To manage barley powdery mildew, apply fungicides and maintain proper spacing between plants to improve air circulation. Planting resistant barley varieties can also help prevent disease spread.', 'barley_powdery_mildew.png'),
(12, 3, 'Barley Stripe Rust', 'Barley stripe rust is a fungal disease characterized by yellow-orange stripes on barley leaves, leading to reduced photosynthesis and yield.', 'To control barley stripe rust, apply fungicides preventively and use resistant barley cultivars. Timely planting and avoiding excessive nitrogen fertilization can also help minimize disease incidence.', 'barley_stripe_rust.png'),
(13, 3, 'Barley Head Blight', 'Barley head blight, also known as Fusarium head blight, is a fungal disease that causes bleaching and shriveling of barley heads, resulting in yield losses and mycotoxin contamination.', 'To manage barley head blight, implement crop rotation and use fungicides during flowering. Avoid planting barley in fields with corn or wheat residues, as they can harbor the Fusarium fungus.', 'barley_head_blight.png'),
(14, 3, 'Barley Leaf Spot', 'Barley leaf spot is a fungal disease that causes circular lesions with dark borders on barley leaves, reducing photosynthetic capacity and yield.', 'To control barley leaf spot, apply fungicides preventively and practice crop rotation. Maintaining proper soil moisture and avoiding overhead irrigation can also help minimize disease spread.', 'barley_leaf_spot.png'),
(15, 3, 'Barley Loose Smut', 'Barley loose smut is a fungal disease that results in the production of masses of dark spores on barley heads, leading to yield losses and seed contamination.', 'To manage barley loose smut, use certified disease-free seeds and treat seeds with fungicides before planting. Implementing crop rotation and avoiding early planting can also help reduce disease incidence.', 'barley_loose_smutf.png'),
(16, 4, 'Oat Rust', 'Oat rust is a fungal disease characterized by orange-brown pustules on oat leaves, causing reduced photosynthesis and yield.', 'To control oat rust, apply fungicides preventively and use resistant oat varieties. Avoid excessive nitrogen fertilization and practice good field sanitation to minimize disease spread.', 'oat_rust.png'),
(17, 4, 'Oat Crown Rust', 'Oat crown rust is a fungal disease that affects oat leaves, stems, and panicles, leading to reduced grain quality and yield.', 'To manage oat crown rust, apply fungicides preventively and use resistant oat cultivars. Implementing crop rotation and maintaining proper plant spacing can also help reduce disease incidence.', 'oat_crown_rust.png'),
(18, 4, 'Oat Smut', 'Oat smut is a fungal disease that produces dark, powdery masses of spores on oat panicles, causing yield losses and seed contamination.', 'To control oat smut, use certified disease-free seeds and treat seeds with fungicides before planting. Implementing crop rotation and avoiding planting oats in fields with a history of smut can also help minimize disease incidence.', 'oat_smutf.png'),
(19, 4, 'Oat Leaf Blotch', 'Oat leaf blotch is a fungal disease that appears as irregular brown lesions on oat leaves, reducing photosynthetic capacity and yield.', 'To manage oat leaf blotch, apply fungicides preventively and practice crop rotation. Ensure proper soil drainage and avoid excessive nitrogen fertilization to minimize disease spread.', 'oat_leaf_blotch.png'),
(20, 4, 'Oat Septoria Leaf Spot', 'Oat septoria leaf spot is a fungal disease characterized by small, dark lesions with yellow halos on oat leaves, leading to reduced yield and quality.', 'To control oat septoria leaf spot, apply fungicides preventively and practice crop rotation. Proper weed management and maintaining plant vigor can also help minimize disease incidence.', 'oat_septoria_leaf_spot.png'),
(21, 5, 'Early Blight', 'Early blight is a fungal disease that affects tomato plants, causing dark lesions on leaves and reducing yield.', 'To control early blight, practice crop rotation, use fungicides, and remove infected plant debris.', 'early_blight_tomato.png'),
(22, 5, 'Late Blight', 'Late blight is a destructive disease of tomato plants, characterized by water-soaked lesions on leaves and fruit.', 'To manage late blight, apply fungicides preventatively, improve air circulation, and avoid overhead watering.', 'late_blight_tomato.png'),
(23, 5, 'Blossom End Rot', 'Blossom end rot is a physiological disorder in tomatoes, resulting in dark, sunken areas on the blossom end of fruit.', 'Prevent blossom end rot by maintaining consistent soil moisture, providing adequate calcium, and avoiding excessive nitrogen fertilization.', 'blossom_end_rot_tomato.png'),
(24, 5, 'Fusarium Wilt', 'Fusarium wilt is a fungal disease that affects tomato plants, causing wilting, yellowing of leaves, and eventual plant death.', 'Control fusarium wilt by planting resistant tomato varieties, practicing crop rotation, and using sterilized soil.', 'fusarium_wilt_tomato.png'),
(25, 5, 'Septoria Leaf Spot', 'Septoria leaf spot is a fungal disease that affects tomato plants, causing small, dark spots on leaves which enlarge over time.', 'Manage septoria leaf spot by removing infected plant material, applying fungicides, and practicing proper plant spacing.', 'septoria_leaf_spot_tomato.png'),
(26, 6, 'Late Blight', 'Late blight is a serious fungal disease affecting potato plants, leading to rapid defoliation and rotting of tubers.', 'To prevent late blight, practice good sanitation, use resistant potato varieties, and apply fungicides.', 'late_blight_potato.png'),
(27, 6, 'Early Blight', 'Early blight is a common fungal disease of potato plants, causing dark lesions on leaves and reducing tuber quality.', 'Control early blight by applying fungicides, practicing crop rotation, and removing infected plant debris.', 'early_blight_potato.png'),
(28, 6, 'Potato Scab', 'Potato scab is a bacterial disease that affects potato tubers, causing raised, corky lesions on the skin.', 'Prevent potato scab by planting disease-free seed potatoes, maintaining proper soil pH, and avoiding excessive irrigation.', 'potato_scab.png'),
(29, 6, 'Blackleg', 'Blackleg is a bacterial disease that affects potato plants, causing dark lesions on stems and tubers, leading to plant death.', 'Manage blackleg by planting certified disease-free seed potatoes and practicing crop rotation.', 'blackleg_potato.png'),
(30, 6, 'Potato Virus Y', 'Potato virus Y is a viral disease that affects potato plants, causing mosaic patterns and stunted growth.', 'Prevent potato virus Y by using virus-free seed potatoes, controlling aphid vectors, and rogueing infected plants.', 'potato_virus_y.png'),
(31, 7, 'Powdery Mildew', 'Powdery mildew is a fungal disease that appears as white powdery spots on carrot leaves, reducing photosynthesis and weakening the plant.', 'To control powdery mildew, use fungicides labeled for powdery mildew control. Maintain good air circulation and avoid overhead watering to reduce humidity.', 'powdery_mildew_carrot.png'),
(32, 7, 'Carrot Root Knot Nematode', 'Carrot root knot nematode is a microscopic roundworm that infects carrot roots, causing galls and reducing yield.', 'Control carrot root knot nematode by planting resistant carrot varieties, using soil solarization, and practicing crop rotation.', 'carrot_root_knot_nematode.png'),
(33, 7, 'Leaf Blight', 'Leaf blight is a fungal disease that affects carrot foliage, causing brown lesions and leaf dieback.', 'To manage leaf blight, apply fungicides, practice good crop rotation, and remove infected plant debris.', 'leaf_blight_carrot.png'),
(34, 7, 'Aster Yellows', 'Aster yellows is a phytoplasma disease that affects carrots, causing yellowing, stunted growth, and malformed leaves.', 'Prevent aster yellows by controlling leafhopper vectors, removing infected plants, and avoiding planting near susceptible crops.', 'aster_yellows_carrot.png'),
(35, 7, 'Bacterial Blight', 'Bacterial blight manifests as water-soaked lesions on carrot leaves and stems, often leading to wilting and plant death.', 'Practice crop rotation and maintain proper spacing between carrot plants to promote airflow and reduce disease spread. Use copper-based fungicides as a preventative measure.', 'bacterial_blight_carrot.png'),
(36, 8, 'Fusarium Wilt', 'Fusarium wilt is a soil-borne fungal disease that causes wilting and yellowing of lettuce plants, often leading to plant death.', 'Practice crop rotation and avoid planting lettuce in fields with a history of Fusarium wilt. Use disease-resistant varieties and maintain optimal soil moisture to reduce disease incidence.', 'fusarium_wilt_lettuce.png'),
(37, 8, 'Downy Mildew', 'Downy mildew is a fungal disease that affects lettuce plants, causing yellowing of leaves and fuzzy growth on the undersides.', 'Prevent downy mildew with proper spacing, good air circulation, and applying fungicides.', 'downy_mildew_lettuce.png'),
(38, 8, 'Bottom Rot', 'Bottom rot is a fungal disease of lettuce, characterized by dark lesions at the base of plants and decay of lower leaves.', 'To manage bottom rot, practice crop rotation, avoid overhead watering, and remove infected plants.', 'bottom_rot_lettuce.png'),
(39, 8, 'Septoria Leaf Spot', 'Septoria leaf spot is a fungal disease that affects lettuce plants, causing small, dark spots on leaves which enlarge over time.', 'Manage septoria leaf spot by removing infected plant material, applying fungicides, and practicing proper plant spacing.', 'septoria_leaf_spot_lettuce.png'),
(40, 8, 'Tipburn', 'Tipburn is a physiological disorder in lettuce, characterized by browning and necrosis of leaf edges.', 'Prevent tipburn by providing consistent moisture, avoiding excessive nitrogen fertilization, and maintaining proper calcium levels.', 'tipburn_lettuce.png'),
(41, 9, 'Bell Pepper Anthracnose', 'Bell pepper anthracnose is a fungal disease that causes dark, sunken lesions on pepper fruit.', 'Manage bell pepper anthracnose by using disease-free seeds, practicing proper spacing, and applying fungicides.', 'anthracnose_bell_pepper.png'),
(42, 9, 'Pepper Powdery Mildew', 'Pepper powdery mildew is a fungal disease that affects pepper plants, causing white powdery growth on leaves and stems.', 'To control powdery mildew, apply fungicides, maintain proper air circulation, and avoid overhead watering.', 'powdery_mildew_bell_pepper.png'),
(43, 9, 'Blossom End Rot', 'Blossom end rot is a physiological disorder in peppers, resulting in dark, sunken areas on the blossom end of fruit.', 'Prevent blossom end rot by maintaining consistent soil moisture, providing adequate calcium, and avoiding excessive nitrogen fertilization.', 'blossom_end_rot_bell_pepper.png'),
(44, 9, 'Pepper Mosaic Virus', 'Pepper mosaic virus is a viral disease that affects pepper plants, causing mosaic patterns and stunted growth.', 'Prevent pepper mosaic virus by using virus-free seeds, controlling aphid vectors, and removing infected plants.', 'mosaic_virus_bell_pepper.png'),
(45, 9, 'Phytophthora Blight', 'Phytophthora blight is a fungal disease that affects pepper plants, causing wilting, dark lesions on stems, and fruit rot.', 'To manage phytophthora blight, improve soil drainage, practice crop rotation, and apply fungicides.', 'phytophthora_blight_bell_pepper.png'),
(46, 10, 'Strawberry Anthracnose', 'Strawberry anthracnose is a fungal disease that affects strawberry plants, causing dark lesions on fruit and foliage.', 'Control strawberry anthracnose by removing infected plant material, applying fungicides, and practicing good sanitation.', 'anthracnose_strawberry.png'),
(47, 10, 'Powdery Mildew', 'Powdery mildew is a fungal disease that affects strawberry plants, causing white powdery growth on leaves and fruit.', 'Prevent powdery mildew by improving air circulation, maintaining proper spacing, and applying fungicides.', 'powdery_mildew_strawberry.png'),
(48, 10, 'Gray Mold', 'Gray mold is a fungal disease of strawberries, characterized by fuzzy gray growth on fruit and foliage.', 'Manage gray mold by removing infected plant material, providing good air circulation, and applying fungicides preventatively.', 'gray_mold_strawberry.png'),
(49, 10, 'Leaf Spot', 'Leaf spot is a fungal disease that affects strawberry plants, causing dark lesions on leaves which may lead to defoliation.', 'To control leaf spot, remove infected plant material, improve air circulation, and apply fungicides.', 'leaf_spot_strawberry.png'),
(50, 10, 'Verticillium Wilt', 'Verticillium wilt is a soilborne fungal disease that affects strawberry plants, causing wilting and decline.', 'Prevent verticillium wilt by using disease-free planting material, practicing crop rotation, and managing irrigation.', 'verticillium_wilt_strawberry.png'),
(51, 11, 'Soybean Rust', 'Soybean rust is a fungal disease that causes orange-brown pustules on soybean leaves, leading to defoliation and yield loss.', 'To manage soybean rust, use resistant soybean varieties, apply fungicides preventively, and practice crop rotation. Early detection and removal of infected plants can also help reduce disease spread.', 'soybean_rust.png'),
(52, 11, 'Soybean Sudden Death Syndrome', 'Soybean sudden death syndrome is a soil-borne fungal disease that causes yellowing and necrosis of soybean leaves, ultimately leading to plant death.', 'Implementing crop rotation with non-host crops, managing soil drainage, and using fungicide seed treatments can help control soybean sudden death syndrome. Planting resistant soybean varieties is also advisable.', 'soybean_sudden_death_syndrome.png'),
(53, 11, 'Soybean Cyst Nematode', 'Soybean cyst nematode is a microscopic roundworm that infects soybean roots, causing stunted growth, yellowing, and wilting of plants.', 'Practice crop rotation with non-host plants, use resistant soybean varieties, and apply nematicides to manage soybean cyst nematode. Monitoring soil for nematode presence and avoiding movement of infested soil can also help prevent spread.', 'soybean_cyst_nematode.png'),
(54, 11, 'Soybean Leaf Blight', 'Soybean leaf blight is a fungal disease characterized by irregularly shaped lesions on soybean leaves, leading to reduced photosynthesis and yield loss.', 'To control soybean leaf blight, implement crop rotation with non-host crops, use resistant soybean varieties, and apply fungicides preventively. Removing crop debris and managing plant density can also help reduce disease severity.', 'soybean_leaf_blight.png'),
(55, 11, 'Soybean Anthracnose', 'Soybean anthracnose is a fungal disease that causes dark, sunken lesions on soybean stems, pods, and seeds, leading to reduced yield and quality.', 'Applying fungicides preventively, using resistant soybean varieties, and practicing crop rotation can help manage soybean anthracnose. Timely harvest and removal of infected debris can also reduce disease pressure.', 'soybean_anthracnose.png'),
(56, 12, 'Bean Rust', 'Bean rust is a fungal disease that causes orange-brown rust pustules on bean leaves, leading to defoliation and yield loss.', 'To manage bean rust, use resistant bean varieties, apply fungicides preventively, and practice crop rotation. Early detection and removal of infected plants can also help reduce disease spread.', 'bean_rust.png'),
(57, 12, 'Bean Powdery Mildew', 'Bean powdery mildew is a fungal disease that appears as white powdery spots on bean leaves, stems, and pods, reducing photosynthesis and yield.', 'Applying fungicides preventively, maintaining proper plant spacing, and improving air circulation can help manage bean powdery mildew. Planting resistant bean varieties and avoiding overhead irrigation can also reduce disease development.', 'bean_powdery_mildew.png'),
(58, 12, 'Bean Bacterial Blight', 'Bean bacterial blight is a bacterial disease that causes water-soaked lesions on bean leaves, leading to necrosis and defoliation.', 'To control bean bacterial blight, use disease-free seeds, practice crop rotation, and apply copper-based bactericides. Avoid working in wet fields to prevent disease spread.', 'bean_bacterial_blight.png'),
(59, 12, 'Bean Common Mosaic Virus', 'Bean common mosaic virus is a viral disease that causes mosaic patterns, yellowing, and stunting of bean plants, leading to reduced yield.', 'To manage bean common mosaic virus, use virus-free seeds, control aphid vectors, and remove infected plants promptly. Planting resistant bean varieties and practicing weed control can also help reduce disease incidence.', 'bean_common_mosaic_virus.png'),
(60, 12, 'Bean Root Rot', 'Bean root rot is a fungal disease that infects bean roots, causing rotting and reduced nutrient uptake, leading to wilting and death of plants.', 'Improving soil drainage, practicing crop rotation, and using fungicide seed treatments can help manage bean root rot. Avoid overwatering and planting in poorly drained soils to reduce disease risk.', 'bean_root_rot.png'),
(61, 13, 'Sunflower Downy Mildew', 'Sunflower downy mildew is a fungal disease that causes yellowing and wilting of sunflower leaves, often accompanied by a white fuzzy growth on the undersides.', 'Applying fungicides preventively, using resistant sunflower varieties, and practicing crop rotation can help manage sunflower downy mildew. Remove and destroy infected plant debris to reduce disease pressure.', 'sunflower_downy_mildew.png'),
(62, 13, 'Sunflower Rust', 'Sunflower rust is a fungal disease that appears as orange-brown rust pustules on sunflower leaves, reducing photosynthesis and yield.', 'To control sunflower rust, use resistant sunflower varieties, apply fungicides preventively, and practice crop rotation. Early detection and removal of infected plants can also help reduce disease spread.', 'sunflower_rust.png'),
(63, 13, 'Sunflower Head Rot', 'Sunflower head rot is a fungal disease that infects sunflower heads, causing rotting and shriveling of seeds, leading to yield loss.', 'Practicing crop rotation with non-host crops, using disease-free seeds, and applying fungicides preventively can help manage sunflower head rot. Proper irrigation management and avoiding excessive nitrogen fertilization can also reduce disease incidence.', 'sunflower_head_rot.png'),
(64, 13, 'Sunflower Stem Canker', 'Sunflower stem canker is a fungal disease that causes sunflower stems to develop sunken, dark lesions, leading to lodging and yield loss.', 'To control sunflower stem canker, use resistant sunflower varieties, apply fungicides preventively, and practice crop rotation. Avoid planting sunflowers in fields with a history of stem canker and remove infected crop debris.', 'sunflower_stem_canker.png'),
(65, 13, 'Sunflower Phomopsis Stem Canker', 'Sunflower phomopsis stem canker is a fungal disease that infects sunflower stems, causing wilting and death of affected plants.', 'Improving air circulation, practicing crop rotation, and applying fungicides preventively can help manage sunflower phomopsis stem canker. Remove and destroy infected plant debris to reduce disease spread.', 'sunflower_phomopsis_stem_canker.png'),
(66, 14, 'Leaf Spot', 'Leaf spot is a common fungal disease in peanuts, characterized by dark lesions on leaves, which can lead to defoliation and reduced yield.', 'To control leaf spot, practice crop rotation, improve air circulation, and apply fungicides when necessary. Remove and destroy infected plant debris to prevent disease spread.', 'leaf_spot_peanut.png'),
(67, 14, 'Early Leaf Spot', 'Early leaf spot is caused by a fungus and appears as small, dark spots on peanut leaves. Severe infections can lead to defoliation and yield loss.', 'To manage early leaf spot, plant disease-resistant varieties, practice crop rotation, and apply fungicides preventively. Ensure proper irrigation and avoid overhead watering.', 'early_leaf_spot_peanut.png'),
(68, 14, 'Late Leaf Spot', 'Late leaf spot is a fungal disease that affects peanut foliage, causing circular lesions with dark margins. Severe infections can lead to defoliation and yield reduction.', 'To control late leaf spot, maintain good field hygiene, plant disease-resistant varieties, and apply fungicides according to a preventive schedule. Avoid excessive nitrogen fertilization.', 'late_leaf_spot_peanut.png'),
(69, 14, 'Peanut Smut', 'Peanut smut is a fungal disease that affects peanut pods, causing black, powdery masses of spores. Infected pods are often malformed and unsuitable for consumption.', 'Prevent peanut smut by planting disease-free seeds, practicing crop rotation, and maintaining proper soil drainage. Avoid planting peanuts in fields with a history of smut.', 'peanut_smut.png'),
(70, 14, 'Limb Rot', 'Limb rot is the foliar blight phase of a disease complex in peanut caused by the fungus Rhizoctonia solani. This fungus also causes seedling disease and root, pod, and peg rots.', 'Crop rotation, seed treatment, fungicides, varietal resistance.', 'limb_rot_peanut.png');

-- --------------------------------------------------------

--
-- Table structure for table `encyclopedia_faq`
--

CREATE TABLE `encyclopedia_faq` (
  `faq_id` int(11) NOT NULL,
  `encyclopedia_id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encyclopedia_faq`
--

INSERT INTO `encyclopedia_faq` (`faq_id`, `encyclopedia_id`, `question`, `answer`) VALUES
(1, 1, 'What is the ideal climate for growing wheat?', 'Wheat thrives in temperate climates with cool winters and mild springs. It requires a period of cold temperatures (vernalization) to initiate flowering and grain production.'),
(2, 1, 'How deep should wheat seeds be planted?', 'Wheat seeds should be planted approximately 1 to 2 inches deep in well-prepared soil. Planting too shallow can result in poor establishment, while planting too deep may delay emergence.'),
(3, 1, 'What are common pests and diseases affecting wheat?', 'Common pests affecting wheat include aphids, armyworms, and Hessian flies. Diseases such as rusts, powdery mildew, and Fusarium head blight can also impact wheat yield and quality.'),
(4, 1, 'When is the best time to harvest wheat?', 'The best time to harvest wheat is when the kernels are fully mature and dry, typically in early summer. Harvesting too early can result in low grain yield and quality, while delaying harvest may lead to shattering and grain loss.'),
(5, 1, 'How should wheat be stored after harvest?', 'After harvest, wheat should be stored in clean, dry bins or silos with adequate ventilation to prevent moisture buildup and mold growth. Properly stored wheat can be preserved for an extended period without quality deterioration.'),
(6, 2, 'How deep should corn seeds be planted?', 'Corn seeds should be planted about 1 to 2 inches deep in the soil. Planting too shallow can result in poor root development, while planting too deep may delay emergence or cause uneven germination.'),
(7, 2, 'What are common pests and diseases affecting corn?', 'Common pests that affect corn include corn earworms, cutworms, and corn borers. Diseases such as gray leaf spot, northern corn leaf blight, and common rust can also impact corn yields. Proper crop rotation and pest management practices can help mitigate these issues.'),
(8, 2, 'When is the best time to harvest corn?', 'Corn is typically ready for harvest when the kernels are fully developed and exude a milky substance when pierced. This usually occurs about 20 to 25 days after the appearance of the silks. For sweet corn, harvest when the kernels are plump and juicy.'),
(9, 2, 'How often should corn be watered?', 'Corn requires consistent moisture, especially during its critical growth stages such as tasseling and silking. Aim to provide about 1 to 1.5 inches of water per week, either through rainfall or irrigation, ensuring the soil remains consistently moist but not waterlogged.'),
(10, 2, 'What spacing is recommended for planting corn?', 'Corn plants should be spaced about 8 to 12 inches apart within rows, with rows spaced approximately 30 to 36 inches apart. Adequate spacing ensures sufficient access to sunlight, air circulation, and room for root development, leading to healthier plants and higher yields.'),
(11, 3, 'What is the best time to plant barley?', 'Barley is typically planted in the early spring or fall, depending on the climate and variety. In cooler regions, planting in the early spring allows barley to establish before the onset of hot weather, while in warmer regions, fall planting takes advantage of cooler temperatures for germination and early growth.'),
(12, 3, 'How deep should barley seeds be planted?', 'Barley seeds should be planted about 1 to 1.5 inches deep in the soil. Planting too shallow can expose seeds to drying out or being eaten by birds, while planting too deep may delay emergence or lead to poor establishment.'),
(13, 3, 'What are common pests and diseases affecting barley?', 'Common pests that affect barley include aphids, grasshoppers, and cereal leaf beetles. Diseases such as powdery mildew, barley yellow dwarf virus, and Fusarium head blight can also impact barley yields. Implementing integrated pest management strategies and selecting resistant varieties can help manage these threats.'),
(14, 3, 'How should barley be fertilized?', 'Barley has moderate fertility requirements and benefits from balanced fertilization. Apply nitrogen fertilizer at planting or as a top-dressing during the growing season, ensuring not to exceed recommended rates to avoid lodging or nutrient imbalances. Soil testing can help determine specific nutrient needs.'),
(15, 3, 'When is barley ready for harvest?', 'Barley is typically ready for harvest when the kernels are firm and the plants have turned golden yellow or brown. Test the moisture content of the grains, aiming for around 12-13% moisture for optimal storage. Harvesting too early can result in lower yields and immature grains, while delaying harvest risks lodging and grain loss.'),
(16, 4, 'What type of soil is best for growing oats?', 'Oats prefer well-drained, loamy soil with good organic matter content. Soil pH should be between 6.0 and 7.0 for optimal growth. Avoid heavy clay soils that can impede root development and drainage, leading to poor yields.'),
(17, 4, 'How should oats be planted?', 'Oats can be broadcast or drilled into prepared seedbeds, ideally at a depth of 1 to 2 inches. Ensure even seed distribution and adequate soil coverage to promote uniform germination and stand establishment. Plant oats early in the spring for summer harvest or in the fall for overwintering.'),
(18, 4, 'What are common pests and diseases affecting oats?', 'Common pests that affect oats include aphids, armyworms, and wireworms. Diseases such as crown rust, powdery mildew, and Fusarium head blight can also impact oat yields. Implementing cultural practices such as crop rotation and selecting resistant varieties can help manage these threats.'),
(19, 4, 'How often should oats be watered?', 'Oats require regular moisture, especially during critical growth stages such as tillering and heading. Aim to provide about 1 to 1.5 inches of water per week, either through rainfall or supplemental irrigation, ensuring the soil remains consistently moist but not waterlogged.'),
(20, 4, 'When is the best time to harvest oats?', 'Oats are typically ready for harvest when the grains have turned from green to golden yellow and the seed heads have drooped. Test the moisture content of the grains, aiming for around 12-14% moisture for optimal storage. Harvesting too early can result in lower yields and immature grains, while delaying harvest risks grain loss and shattering.'),
(21, 5, 'How often should I water tomato plants?', 'Tomato plants generally need consistent watering, especially during hot and dry periods. Water them deeply once or twice a week, ensuring the soil stays evenly moist but not waterlogged.'),
(22, 5, 'Do tomato plants require support?', 'Yes, most tomato varieties benefit from some form of support, such as stakes, cages, or trellises. Supporting tomato plants helps prevent them from sprawling on the ground, reduces disease risk, and makes harvesting easier.'),
(23, 5, 'What are common pests and diseases affecting tomato plants?', 'Common pests include aphids, whiteflies, and tomato hornworms, while diseases such as early blight, late blight, and blossom end rot can also affect tomato plants. Regular monitoring and proper cultural practices can help prevent and manage these issues.'),
(24, 5, 'When is the best time to harvest tomatoes?', 'Tomatoes are typically ready for harvest when they reach full color and firmness. Depending on the variety, this can range from green to fully ripe red, yellow, or other colors. Harvest gently to avoid damaging the fruit.'),
(25, 5, 'How should I store harvested tomatoes?', 'Harvested tomatoes should be stored at room temperature away from direct sunlight until fully ripe. Once ripe, they can be stored in the refrigerator for a few days, but their flavor may diminish. Avoid storing tomatoes in the refrigerator before they are fully ripe, as it can affect their taste and texture negatively.'),
(26, 6, 'How do I plant potatoes?', 'Potatoes are usually planted from seed potatoes, which are small potatoes with \"eyes\" or sprouts. Plant them in well-drained, loose soil in early spring, spacing them about 12 inches apart in rows. Hill up soil around the plants as they grow to promote tuber development.'),
(27, 6, 'How much sunlight do potato plants need?', 'Potato plants require full sunlight to grow well. Plant them in a location that receives at least 6-8 hours of direct sunlight per day for optimal growth and yield.'),
(28, 6, 'What are signs that potatoes are ready to harvest?', 'Potatoes are typically ready for harvest when the foliage turns yellow and begins to die back. You can also gently dig around the base of the plants to check for mature potatoes. Avoid harvesting too early, as immature potatoes may not store well.'),
(29, 6, 'Can I grow potatoes in containers?', 'Yes, potatoes can be grown in containers such as large pots or grow bags. Choose a container with good drainage, fill it with a loose, well-draining potting mix, and plant seed potatoes about 4 inches deep. As the plants grow, gradually add more soil or mulch to cover the stems, leaving a few inches exposed.'),
(30, 6, 'How should I store harvested potatoes?', 'Harvested potatoes should be cured for a few days in a cool, dark, well-ventilated place to toughen their skins. After curing, store them in a cool, dark, and humid location such as a cellar or pantry. Avoid storing potatoes near onions, as onions emit gases that can cause potatoes to spoil faster.'),
(31, 7, 'How deep should I plant carrot seeds?', 'Carrot seeds should be sown about 1/4 to 1/2 inch deep in loose, well-draining soil. Avoid planting them too deeply, as this can delay germination or cause poor seedling emergence.'),
(32, 7, 'Do carrot plants require thinning?', 'Yes, carrot seedlings typically require thinning to ensure proper spacing and encourage healthy root development. Once the seedlings are a few inches tall, thin them to about 2 inches apart to allow room for the carrots to grow to full size.'),
(33, 7, 'How often should I water carrot plants?', 'Carrot plants need consistent moisture to develop properly, especially during the early stages of growth. Water them deeply once or twice a week, ensuring the soil stays evenly moist but not waterlogged.'),
(34, 7, 'What pests and diseases affect carrot plants?', 'Carrot rust fly, carrot weevil, and aphids are common pests that can affect carrot plants. Diseases such as carrot leaf blight and cavity spot can also be problematic. Practice crop rotation and proper sanitation to help prevent these issues.'),
(35, 7, 'When are carrots ready to harvest?', 'Carrots are typically ready for harvest 60-80 days after planting, depending on the variety and growing conditions. You can harvest them when they reach the desired size, usually about 1/2 to 3/4 inch in diameter, by gently pulling them from the soil.'),
(36, 8, 'How much sunlight does lettuce need?', 'Lettuce prefers cool temperatures and partial shade, especially in hot climates. Plant it in a location that receives morning sun and afternoon shade, or use shade cloth to provide protection from intense sunlight.'),
(37, 8, 'Can lettuce be grown indoors?', 'Yes, lettuce can be grown indoors under grow lights or in a sunny window. Choose a compact variety suitable for container growing, and provide adequate light, air circulation, and moisture.'),
(38, 8, 'How often should I water lettuce plants?', 'Lettuce plants need consistent moisture to prevent wilting and bitterness. Water them regularly, keeping the soil evenly moist but not waterlogged. Mulching can help retain soil moisture and regulate temperature fluctuations.'),
(39, 8, 'What pests and diseases affect lettuce plants?', 'Common pests include aphids, slugs, and snails, while diseases such as lettuce downy mildew and bottom rot can also affect lettuce plants. Practice good garden hygiene and use natural pest control methods to manage these issues.'),
(40, 8, 'When is the best time to harvest lettuce?', 'Lettuce leaves can be harvested at any stage of growth, depending on your preference for leaf size and texture. For loose-leaf varieties, you can start harvesting outer leaves when the plant reaches 4-6 inches tall. For head-forming varieties, wait until the heads are firm and compact before harvesting.'),
(41, 9, 'How much sunlight do bell pepper plants need?', 'Bell pepper plants require full sunlight to thrive and produce abundant fruit. Plant them in a location that receives at least 6-8 hours of direct sunlight per day for optimal growth and yield.'),
(42, 9, 'Do bell pepper plants require support?', 'Although not always necessary, providing support such as stakes or cages can help keep bell pepper plants upright, especially when heavily laden with fruit. Supporting the plants also reduces the risk of branches breaking under the weight of the peppers.'),
(43, 9, 'How often should I water bell pepper plants?', 'Bell pepper plants need regular watering, especially during hot and dry periods. Water them deeply once or twice a week, ensuring the soil stays evenly moist but not waterlogged. Mulching can help retain soil moisture and suppress weeds.'),
(44, 9, 'What pests and diseases affect bell pepper plants?', 'Common pests include aphids, flea beetles, and pepper maggots, while diseases such as bacterial spot and blossom end rot can also affect bell pepper plants. Practice crop rotation and proper sanitation to help prevent these issues.'),
(45, 9, 'When are bell peppers ready to harvest?', 'Bell peppers can be harvested when they reach their mature size and color. Most varieties turn green initially and then ripen to red, yellow, orange, or other colors. Harvest peppers with sharp pruning shears or scissors, cutting them from the plant rather than pulling, to avoid damaging the stems.'),
(46, 10, 'What type of soil is best for growing strawberries?', 'Strawberries prefer well-draining, slightly acidic soil rich in organic matter. Sandy loam or loamy soil with good fertility and a pH between 5.5 and 6.5 is ideal for growing strawberries.'),
(47, 10, 'How should I water strawberry plants?', 'Water strawberry plants regularly, aiming to keep the soil consistently moist but not waterlogged. Provide about 1-2 inches of water per week, adjusting based on weather conditions and soil moisture levels.'),
(48, 10, 'Do strawberry plants require fertilization?', 'Yes, strawberry plants benefit from regular fertilization to promote healthy growth and fruit production. Apply a balanced fertilizer, such as 10-10-10, in early spring and again after the first harvest, following package instructions.'),
(49, 10, 'How do I protect strawberries from pests?', 'Protect strawberries from pests such as slugs, snails, and birds by using physical barriers like netting or row covers. Additionally, practice good garden hygiene by removing weeds and debris that can harbor pests.'),
(50, 10, 'When is the best time to harvest strawberries?', 'Strawberries are typically ready to harvest when they are fully ripe, which is indicated by their bright red color and sweet fragrance. Harvest strawberries in the morning when the berries are cool and firm, using scissors or a sharp knife to cut the stems.'),
(51, 11, 'When is the best time to plant soybeans?', 'Soybeans are best planted in spring when the soil temperature reaches around 55°F to 60°F. This typically occurs when all danger of frost has passed.'),
(52, 11, 'Do soybeans require nitrogen fixation?', 'Yes, soybeans are legumes and have the ability to fix nitrogen from the atmosphere with the help of symbiotic bacteria called rhizobia. This reduces the need for nitrogen fertilizer and benefits the soil.'),
(53, 11, 'How deep should soybean seeds be planted?', 'Plant soybean seeds about 1 to 1.5 inches deep in moist soil. Planting too shallow can result in poor germination, while planting too deep may delay emergence.'),
(54, 11, 'How often should soybeans be watered?', 'Soybeans need consistent moisture, especially during flowering and pod development stages. Aim to provide about 1 inch of water per week, either through rainfall or irrigation, ensuring the soil stays evenly moist but not waterlogged.'),
(55, 11, 'How do you know when soybeans are ready for harvest?', 'Soybeans are typically ready for harvest when the pods have turned yellow or brown, and the seeds inside are firm and fully developed. Test a few pods by cracking them open to check seed maturity before harvesting the entire crop.'),
(56, 12, 'Can beans tolerate frost?', 'Most bean varieties are sensitive to frost and should be planted after all danger of frost has passed. However, some cold-tolerant varieties may withstand light frosts.'),
(57, 12, 'How often should beans be fertilized?', 'Beans have modest fertility needs and generally do not require heavy fertilization. Incorporating compost or well-rotted manure into the soil before planting can provide sufficient nutrients for healthy growth.'),
(58, 12, 'Do beans require trellising?', 'Some varieties of beans, such as pole beans, benefit from trellising or support to keep the vines off the ground and promote air circulation. Bush beans, however, typically do not require trellising.'),
(59, 12, 'What pests are common to bean plants?', 'Common pests that may affect bean plants include aphids, bean beetles, and spider mites. Regular inspection and early intervention with insecticidal soap or neem oil can help control pest infestations.'),
(60, 12, 'How long does it take for beans to mature?', 'The time to maturity for beans varies depending on the variety. Bush beans typically mature in about 50-55 days, while pole beans may take 60-75 days to reach harvest maturity. Harvest when the pods are firm and plump, but before they become tough and stringy.'),
(61, 13, 'How much sunlight do sunflowers need?', 'Sunflowers require full sun and thrive in at least 6-8 hours of direct sunlight per day. Ensure they are planted in a location with ample sunlight exposure.'),
(62, 13, 'When is the best time to plant sunflowers?', 'The best time to plant sunflowers is in late spring or early summer after the last frost has passed. Sunflowers prefer warm soil temperatures for germination and growth.'),
(63, 13, 'Do sunflowers need fertilizer?', 'Sunflowers are relatively low-maintenance and can grow in poor soil conditions. However, if the soil is nutrient-deficient, you can apply a balanced fertilizer sparingly at planting time to promote healthy growth.'),
(64, 13, 'How often should sunflowers be watered?', 'Water sunflowers regularly, especially during dry periods, to keep the soil consistently moist but not waterlogged. Avoid overhead watering to prevent fungal diseases.'),
(65, 13, 'How do I harvest sunflower seeds?', 'Wait until the back of the sunflower heads turn brown and the seeds develop a black or dark striped appearance. Cut the heads with pruning shears, hang them upside down in a dry, well-ventilated area, and once fully dry, rub the seeds off the head and store them in a cool, dry place.'),
(66, 14, 'What type of soil do peanuts prefer?', 'Peanuts prefer well-draining, sandy soil with a pH between 5.8 and 6.2. Soil should be loose and friable to allow for easy peg penetration and pod development.'),
(67, 14, 'How deep do peanut plants root?', 'Peanut plants develop a taproot that can penetrate the soil up to 3 feet deep. However, the majority of the peanut pods develop within the top 6 inches of soil.'),
(68, 14, 'Do peanut plants require pollination?', 'No, peanut plants are self-pollinating, meaning they do not require insects or wind for pollination. The flowers self-pollinate before they open, and then the ovary develops into a pod without external assistance.'),
(69, 14, 'Can peanuts grow in containers?', 'Yes, peanuts can be grown in large containers or pots with a minimum depth of 12 inches. Ensure the container has adequate drainage holes and use a well-draining potting mix to prevent waterlogging.'),
(70, 14, 'Are peanut plants susceptible to any diseases?', 'Yes, peanut plants are susceptible to various diseases, including leaf spot, rust, and aflatoxin contamination. Practice crop rotation, maintain good soil drainage, and avoid overhead watering to minimize disease incidence.');

-- --------------------------------------------------------

--
-- Table structure for table `encyclopedia_info`
--

CREATE TABLE `encyclopedia_info` (
  `info_id` int(11) NOT NULL,
  `encyclopedia_id` int(11) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encyclopedia_info`
--

INSERT INTO `encyclopedia_info` (`info_id`, `encyclopedia_id`, `description`) VALUES
(1, 1, 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat (T. aestivum).'),
(2, 2, 'Corn, also known as maize, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. The leafy stalk of the plant produces pollen inflorescences and separate ovuliferous inflorescences called ears that yield kernels or seeds, which are fruits.'),
(3, 3, 'Barley is a member of the grass family and is a major cereal grain grown in temperate climates globally. It was one of the first cultivated grains, particularly in Eurasia as early as 10,000 years ago.'),
(4, 4, 'Oats are a nutrient-rich food associated with lower blood cholesterol when consumed regularly. They are a good source of carbs and fiber, including the powerful fiber beta-glucan. They also contain more protein and fat than most grains.'),
(5, 5, 'Tomatoes are the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America. The Nahuatl (Aztec language) word tomatl gave rise to the Spanish word tomate, from which the English word tomato derived.'),
(6, 6, 'Potatoes are a versatile, starchy root vegetable of the Solanaceae family native to the Americas. They are a staple food in many parts of the world and an integral part of much of the world\'s food supply.'),
(7, 7, 'Carrots are a root vegetable that is often claimed to be the perfect health food. They are crunchy, tasty, and highly nutritious. Carrots are a particularly good source of beta carotene, fiber, vitamin K1, potassium, and antioxidants. They also have a number of health benefits. They\'re a weight-loss-friendly food and have been linked to lower cholesterol levels and improved eye health.'),
(8, 8, 'Lettuce is a leafy vegetable often used in salads and sandwiches. It is a good source of several vitamins and minerals, especially vitamin K and vitamin A. Lettuce comes in various types, including iceberg, romaine, and leaf lettuce.'),
(9, 9, 'Bell peppers are fruits of plants from the Capsicum family. They are rich in vitamins and antioxidants, especially vitamin C and various carotenoids. Bell peppers come in various colors, including red, yellow, orange, and green.'),
(10, 10, 'Strawberries are a delicious and nutritious fruit known for their bright red color and sweet flavor. They are rich in vitamins, antioxidants, and fiber. Strawberries may help improve heart health and reduce the risk of chronic diseases.'),
(11, 11, 'Soybeans are legumes native to East Asia and are an important source of protein and oil worldwide. They are used in various forms, including tofu, tempeh, soy milk, and soy sauce. Soybeans are also used in animal feed and in the production of biodiesel.'),
(12, 12, 'Beans are a type of legume that are commonly consumed as food. They are rich in protein, fiber, vitamins, and minerals. Beans come in various types, including black beans, kidney beans, and pinto beans. They are used in a wide range of dishes, including soups, stews, salads, and casseroles.'),
(13, 13, 'Sunflowers are tall, annual plants grown for their large floral heads. The flowers\' heads can vary in size from small to large and the seeds may be used for food or pressed for oil. Sunflower oil is used for cooking, and sunflower seeds are a popular snack.'),
(14, 14, 'Peanuts, also known as groundnuts, are legumes grown underground. They are high in protein, fat, and various vitamins and minerals. Peanuts can be eaten raw, roasted, or used to make peanut butter. They are a popular snack and are also used in cooking and confectionery.');

-- --------------------------------------------------------

--
-- Table structure for table `encyclopedia_pest`
--

CREATE TABLE `encyclopedia_pest` (
  `pest_id` int(11) NOT NULL,
  `encyclopedia_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encyclopedia_pest`
--

INSERT INTO `encyclopedia_pest` (`pest_id`, `encyclopedia_id`, `name`, `description`, `solution`, `image`) VALUES
(1, 1, 'Aphids', 'Aphids are small insects that feed on the sap of wheat plants, causing stunted growth and yellowing of leaves.', 'To control aphids, you can introduce natural predators like ladybugs or use insecticidal soap. Regularly inspect and remove infested plants.', 'aphids.png'),
(2, 1, 'Armyworms', 'Armyworms are caterpillars that can quickly strip wheat fields of foliage, leading to significant crop damage.', 'Applying biological control agents like Bacillus thuringiensis or chemical insecticides can help manage armyworm infestations. Early detection and timely intervention are crucial.', 'armyworms.png'),
(3, 1, 'Wireworms', 'Wireworms are the larvae of click beetles and can bore into wheat roots, causing wilting and reduced yield.', 'Implement crop rotation strategies to reduce wireworm populations. Planting trap crops or using insecticide-treated seeds can also be effective.', 'wireworms.png'),
(4, 1, 'Grasshoppers', 'Grasshoppers can consume large amounts of wheat foliage, leading to defoliation and yield loss.', 'Applying chemical insecticides or using physical barriers like nets can help protect wheat crops from grasshopper damage. Consider introducing natural predators like birds or beneficial insects.', 'grasshoppers.png'),
(5, 1, 'Cutworms', 'Cutworms are nocturnal caterpillars that cut through wheat stems at ground level, causing plants to wilt and die.', 'Applying insecticides or using biological control methods such as parasitic nematodes can help manage cutworm populations. Removing crop debris and maintaining clean field margins can also reduce cutworm habitat.', 'cutworms.png'),
(6, 2, 'Corn Earworm', 'Corn earworms are caterpillars that feed on the kernels of corn ears, causing damage and reducing yield.', 'Biological control using natural predators like parasitic wasps or insecticidal treatments can help manage corn earworm populations.', 'corn_earworm.png'),
(7, 2, 'Corn Rootworm', 'Corn rootworms are beetle larvae that feed on corn roots, leading to poor nutrient uptake and weakened plants.', 'Crop rotation, planting resistant varieties, and applying soil insecticides are effective strategies to control corn rootworms.', 'corn_rootworm.png'),
(8, 2, 'Fall Armyworm', 'Fall armyworms are voracious feeders that can devastate corn crops, especially during the late summer and fall.', 'Early detection and timely insecticide application can help control fall armyworm infestations. Regular scouting is essential.', 'fall_armyworm.png'),
(9, 2, 'Corn Leaf Aphid', 'Corn leaf aphids suck sap from corn leaves, causing yellowing, stunted growth, and reduced photosynthesis.', 'Introducing natural enemies like ladybugs or lacewings can help control corn leaf aphids. Insecticidal soaps are also effective.', 'corn_leaf_aphid.png'),
(10, 2, 'European Corn Borer', 'European corn borers are moth larvae that bore into corn stalks and ears, causing lodging and yield loss.', 'Cultural practices like planting early-maturing corn varieties or using pheromone traps can help manage European corn borer populations.', 'european_corn_borer.png'),
(11, 3, 'Weevils', 'Weevils are small beetles that feed on barley grains, causing damage to stored barley. They can also infest fields, leading to yield loss.', 'Proper storage facilities with controlled temperature and humidity can help prevent weevil infestations in stored barley. In fields, use insecticides and cultural practices like crop rotation.', 'weevils.png'),
(12, 3, 'Aphids', 'Aphids are small insects that feed on the sap of barley plants, causing stunted growth and yellowing of leaves.', 'To control aphids, you can introduce natural predators like ladybugs or use insecticidal soap. Regularly inspect and remove infested plants.', 'aphids.png'),
(13, 3, 'Armyworms', 'Armyworms are caterpillars that can quickly strip barley fields of foliage, leading to significant crop damage.', 'Applying biological control agents like Bacillus thuringiensis or chemical insecticides can help manage armyworm infestations. Early detection and timely intervention are crucial.', 'armyworms.png'),
(14, 3, 'Grasshoppers', 'Grasshoppers can consume large amounts of barley foliage, leading to defoliation and yield loss.', 'Applying chemical insecticides or using physical barriers like nets can help protect barley crops from grasshopper damage. Consider introducing natural predators like birds or beneficial insects.', 'grasshoppers.png'),
(15, 3, 'Flea Beetles', 'Flea beetles are small, jumping insects that feed on barley leaves, causing small holes and skeletonized foliage.', 'Applying insecticides or using row covers can help manage flea beetle infestations. Introducing natural predators like parasitic nematodes or predatory insects can also provide effective control.', 'flea_beetles_barley.png'),
(16, 4, 'Mites', 'Mites are tiny arachnids that can damage oat leaves by feeding on plant juices, leading to stippling, discoloration, and reduced growth.', 'Applying miticides or introducing predatory mites can help control mite infestations. Maintaining proper plant hygiene and avoiding excessive nitrogen fertilizer can also reduce mite populations.', 'mites.png'),
(17, 4, 'Wireworms', 'Wireworms are the larvae of click beetles and can bore into oat roots, causing wilting and reduced yield.', 'Implementing crop rotation strategies to reduce wireworm populations can help protect oat crops. Using insecticide-treated seeds or applying soil insecticides before planting oats can also be effective.', 'wireworms.png'),
(18, 4, 'Armyworms', 'Armyworms are caterpillars that can quickly strip oat fields of foliage, leading to significant crop damage.', 'Applying biological control agents like Bacillus thuringiensis or chemical insecticides can help manage armyworm infestations. Early detection and timely intervention are crucial.', 'armyworms.png'),
(19, 4, 'Grasshoppers', 'Grasshoppers can consume large amounts of oat foliage, leading to defoliation and yield loss.', 'Applying chemical insecticides or using physical barriers like nets can help protect oat crops from grasshopper damage. Consider introducing natural predators like birds or beneficial insects.', 'grasshoppers.png'),
(20, 4, 'Cutworms', 'Cutworms are nocturnal caterpillars that cut through oat stems at ground level, causing plants to wilt and die.', 'Applying insecticides or using biological control methods such as parasitic nematodes can help manage cutworm populations. Removing crop debris and maintaining clean field margins can also reduce cutworm habitat.', 'cutworms.png'),
(21, 5, 'Aphids', 'Aphids are small insects that suck sap from tomato plants, causing leaves to curl and yellow. They can also transmit viruses.', 'Control aphids by releasing natural predators like ladybugs or lacewings. Insecticidal soaps or neem oil can also be effective.', 'aphids.png'),
(22, 5, 'Whiteflies', 'Whiteflies are tiny insects that feed on the undersides of tomato leaves, causing yellowing and reduced vigor. They also secrete honeydew, promoting sooty mold growth.', 'Manage whiteflies by using sticky traps, introducing natural enemies like Encarsia formosa or applying insecticidal soap or horticultural oil.', 'whiteflies.png'),
(23, 5, 'Tomato Hornworm', 'Tomato hornworms are large green caterpillars with horn-like structures on their tails. They can defoliate tomato plants rapidly if left unchecked.', 'Handpick tomato hornworms from plants or use Bacillus thuringiensis (Bt) as a biological control. Keep an eye out for parasitic wasp cocoons, which indicate natural control.', 'hornworm.png'),
(24, 5, 'Spider Mites', 'Spider mites are tiny arachnids that feed on tomato plant sap, causing stippling and webbing on leaves. They reproduce quickly, leading to population explosions.', 'Control spider mites by regularly spraying plants with water to dislodge them, applying predatory mites, or using insecticidal soap or neem oil.', 'spider_mites.png'),
(25, 5, 'Tomato Fruitworm', 'Tomato fruitworms are caterpillars that feed on tomato fruits, causing surface damage and making them unmarketable.', 'Manage tomato fruitworms by inspecting plants regularly and handpicking larvae. Bt sprays or insecticides containing spinosad can also be effective.', 'fruitworm.png'),
(26, 6, 'Colorado Potato Beetle', 'Colorado Potato Beetle is a common pest that feeds on potato plants, causing significant damage to foliage.', 'Use insecticides or biological control methods to manage Colorado Potato Beetle populations. Remove and destroy infested plants to prevent spread.', 'colorado_potato_beetle.png'),
(27, 6, 'Potato Aphids', 'Potato Aphids are small insects that suck sap from potato plants, leading to stunted growth and the transmission of viral diseases.', 'Introduce natural predators like ladybugs or lacewings to control Potato Aphid populations. Apply insecticidal soap or neem oil for severe infestations.', 'potato_aphids.png'),
(28, 6, 'Wireworms', 'Wireworms are the larvae of click beetles and can bore into potato tubers, causing damage and rot.', 'Implement crop rotation strategies to reduce Wireworm populations. Use soil treatments or insecticide-treated seeds for prevention.', 'wireworms.png'),
(29, 6, 'Potato Tuber Moth', 'Potato Tuber Moth larvae tunnel into potato tubers, causing internal damage and reducing quality.', 'Inspect potato crops regularly for signs of Potato Tuber Moth infestation. Use pheromone traps and insecticides for control.', 'potato_tuber_moth.png'),
(30, 6, 'Potato Cyst Nematodes', 'Potato Cyst Nematodes are microscopic worms that infect potato roots, causing yield losses and tuber deformities.', 'Practice crop rotation and use resistant potato varieties to manage Potato Cyst Nematode populations. Treat soil with nematicides if necessary.', 'potato_cyst_nematodes.png'),
(31, 7, 'Carrot Rust Fly', 'Carrot rust flies lay eggs near carrot plants, and their larvae tunnel into the roots, causing damage.', 'Use floating row covers to prevent adult flies from laying eggs. Practice crop rotation to disrupt the life cycle.', 'carrot_rust_fly.png'),
(32, 7, 'Carrot Weevil', 'Carrot weevils feed on carrot roots, causing tunnels and rotting. They can lead to stunted growth and reduced yield.', 'Inspect plants regularly and remove infested ones. Apply insecticides as needed, especially during emergence.', 'carrot_weevil.png'),
(33, 7, 'Aphids', 'Aphids can infest carrot plants, sucking sap and causing wilting and yellowing of leaves.', 'Introduce natural predators like ladybugs or lacewings. Use insecticidal soap or neem oil for control.', 'aphids.png'),
(34, 7, 'Leafhoppers', 'Leafhoppers feed on carrot leaves, causing stippling and yellowing. They can transmit diseases as they feed.', 'Use insecticidal soap or horticultural oil to control leafhoppers. Remove weeds that serve as alternate hosts.', 'leafhoppers.png'),
(35, 7, 'Cutworms', 'Cutworms can cut down young carrot seedlings at soil level, causing plant loss and reduced stand.', 'Place collars around seedlings to prevent cutworm damage. Apply biological insecticides or use soil treatments.', 'cutworms.png'),
(36, 8, 'Lettuce Aphid', 'Lettuce aphids feed on lettuce leaves, causing distortion and stunted growth. They can also transmit viruses.', 'Introduce natural enemies like ladybugs or lacewings. Use insecticidal soap or neem oil for control.', 'lettuce_aphid.png'),
(37, 8, 'Lettuce Leafminer', 'Lettuce leafminers tunnel through lettuce leaves, leaving winding trails and causing cosmetic damage.', 'Remove affected leaves and destroy them. Use insecticides targeted at leafminers, following label instructions.', 'lettuce_leafminer.png'),
(38, 8, 'Flea Beetles', 'Flea beetles chew small holes in lettuce leaves, causing a shot-hole appearance and reduced quality.', 'Use floating row covers to protect young plants. Apply insecticides as needed, focusing on undersides of leaves.', 'flea_beetles.png'),
(39, 8, 'Snails and Slugs', 'Snails and slugs can feed on lettuce leaves, leaving behind slime trails and irregular holes.', 'Handpick snails and slugs in the evening when they are active. Use barriers like copper tape or diatomaceous earth.', 'snails_slugs.png'),
(40, 8, 'Thrips', 'Thrips are tiny insects that feed on lettuce leaves, causing silvering and distortion of plant tissue.', 'Applying insecticidal soap or neem oil can help manage thrips infestations in lettuce crops. Proper weed management and early detection are essential for effective thrips control.', 'thrips.png'),
(41, 9, 'Pepper Weevil', 'Pepper weevils lay eggs in pepper flowers, and their larvae feed inside the fruit, causing damage and rotting.', 'Monitor crops for signs of weevil infestation and remove affected fruits. Apply insecticides targeted at weevils as needed.', 'pepper_weevil.png'),
(42, 9, 'Aphids', 'Aphids can infest bell pepper plants, sucking sap and causing wilting and deformation of leaves and fruits.', 'Introduce natural enemies like ladybugs or lacewings. Use insecticidal soap or neem oil for control.', 'aphids.png'),
(43, 9, 'Pepper Maggots', 'Pepper maggots are the larvae of flies that infest pepper fruits, causing them to rot and become unmarketable.', 'Use yellow sticky traps to monitor adult flies. Apply insecticides early in the season to prevent infestations.', 'pepper_maggots.png'),
(44, 9, 'Spider Mites', 'Spider mites can infest bell pepper plants, feeding on leaves and causing yellowing and stippling.', 'Increase humidity to discourage spider mites. Use miticides or insecticidal soap for control.', 'spider_mites.png'),
(45, 9, 'Thrips', 'Thrips feed on bell pepper leaves and flowers, causing distortion, discoloration, and reduced yield.', 'Use reflective mulches to deter thrips. Apply insecticides targeted at thrips as needed.', 'thrips.png'),
(46, 10, 'Strawberry Aphid', 'Strawberry aphids feed on sap, causing distorted growth and yellowing of leaves. They also transmit viral diseases.', 'Introduce natural enemies like ladybugs or lacewings. Use insecticidal soaps or oils to control aphid populations.', 'strawberry_aphid.png'),
(47, 10, 'Strawberry Root Weevil', 'Strawberry root weevils feed on roots, causing stunted growth and reduced yields. Larvae feed on root hairs and larger roots.', 'Apply insecticides to the soil during early spring to target emerging adults. Use sticky traps to monitor adult activity.', 'strawberry_root_weevil.png'),
(48, 10, 'Spider Mites', 'Spider mites feed on the undersides of leaves, causing stippling and webbing. They thrive in hot, dry conditions.', 'Spray plants with a strong stream of water to dislodge mites. Apply miticides if populations are high.', 'spider_mites.png'),
(49, 10, 'Strawberry Crown Moth', 'Strawberry crown moth larvae bore into crowns and stems, causing wilting and collapse of plants. Adults are small, gray moths.', 'Use row covers to protect plants from adult moths. Apply insecticides targeting larvae when necessary.', 'strawberry_crown_moth.png'),
(50, 10, 'Leafrollers', 'Leafrollers are caterpillars that feed on leaves and fruit, rolling them up with silk. They cause cosmetic damage and reduce fruit quality.', 'Handpick and destroy affected leaves and caterpillars. Apply insecticides targeting larvae during the growing season.', 'leafrollers.png'),
(51, 11, 'Soybean Aphid', 'Soybean aphids feed on sap, causing yellowing and curling of leaves. They reproduce rapidly, leading to population explosions.', 'Introduce natural enemies like ladybugs or parasitic wasps. Apply insecticides if populations exceed economic thresholds.', 'soybean_aphid.png'),
(52, 11, 'Soybean Cyst Nematode', 'Soybean cyst nematodes attack roots, forming cysts that reduce water and nutrient uptake. They can cause significant yield losses.', 'Rotate crops to non-host plants. Plant resistant soybean varieties. Use nematicides in infested fields.', 'soybean_cyst_nematode.png'),
(53, 11, 'Soybean Pod Midge', 'Soybean pod midge larvae feed on developing seeds within pods, causing yield losses and reduced seed quality.', 'Plant early-maturing soybean varieties to avoid midge infestations. Apply insecticides during pod formation if necessary.', 'soybean_pod_midge.png'),
(54, 11, 'Spider Mites', 'Spider mites are tiny arachnids that feed on soybean plants, causing stippling and yellowing of leaves. They reproduce rapidly, leading to population explosions under favorable conditions.', 'Applying miticides or insecticidal soaps can help control spider mite infestations in soybean fields. Regular scouting and early detection are crucial for effective management. Consider using cultural practices like reducing dust and providing adequate moisture to discourage mite activity.', 'spider_mites.png'),
(55, 11, 'Japanese Beetle', 'Japanese beetles feed on soybean foliage, skeletonizing leaves and reducing photosynthesis. They can cause significant yield losses.', 'Use pheromone traps to monitor adult beetle activity. Apply insecticides when beetle populations exceed economic thresholds.', 'japanese_beetle.png'),
(56, 12, 'Bean Weevil', 'Bean weevils are small beetles that feed on beans, damaging seeds and reducing yield. They lay eggs on bean pods.', 'Inspect beans regularly and remove infested ones. Store beans in airtight containers to prevent infestation.', 'bean_weevil.png'),
(57, 12, 'Aphids', 'Aphids are small insects that suck sap from bean plants, causing leaves to curl and distort. They reproduce rapidly in warm conditions.', 'Spray affected plants with insecticidal soap or neem oil. Introduce natural predators like ladybugs or lacewings.', 'aphids.png'),
(58, 12, 'Bean Leaf Beetle', 'Bean leaf beetles are small, yellowish-green beetles that chew holes in bean leaves, reducing plant vigor and yield.', 'Apply insecticides labeled for bean leaf beetle control. Rotate crops to reduce overwintering populations.', 'bean_leaf_beetle.png'),
(59, 12, 'Cutworms', 'Cutworms are caterpillars that feed on bean seedlings, cutting them off at ground level. They are most active at night and hide during the day.', 'Use collar barriers around seedlings to prevent cutworms from reaching them. Handpick and destroy cutworms found on plants.', 'cutworms.png'),
(60, 12, 'Japanese Beetles', 'Japanese beetles are metallic green beetles that feed on bean leaves, skeletonizing them. They can cause severe damage to bean plants if left unchecked.', 'Handpick adult beetles from plants early in the morning when they are sluggish. Apply insecticides if beetle populations are high.', 'japanese_beetles.png'),
(61, 13, 'Sunflower Moth', 'Sunflower moths are small, grayish-brown moths whose larvae bore into sunflower heads, feeding on seeds and causing damage.', 'Harvest sunflowers early before moths lay eggs. Use pheromone traps to monitor moth activity.', 'sunflower_moth.png'),
(62, 13, 'Sunflower Maggot', 'Sunflower maggots are small, yellowish-white larvae that tunnel through sunflower stems, causing wilting and stunted growth.', 'Rotate sunflower crops with non-host plants to disrupt maggot life cycles. Remove and destroy infested plants.', 'sunflower_maggot.png'),
(63, 13, 'Sunflower Headclipping Weevil', 'Sunflower headclipping weevils are small, dark weevils that clip sunflower heads, causing them to drop prematurely.', 'Apply insecticides early in the season when adult weevils emerge. Monitor fields regularly for signs of weevil damage.', 'sunflower_headclipping_weevil.png'),
(64, 13, 'Sunflower Stem Weevil', 'Sunflower stem weevils are small, black weevils that bore into sunflower stems, causing wilting and lodging.', 'Plant sunflowers in well-drained soil to reduce stem weevil infestation. Use insecticides if populations exceed economic thresholds.', 'sunflower_stem_weevil.png'),
(65, 13, 'Sunflower Midge', 'Sunflower midges are small, orange flies whose larvae feed on developing sunflower seeds, causing shriveled kernels and reduced yield.', 'Plant sunflowers early to avoid midge damage. Apply insecticides during midge emergence.', 'sunflower_midge.png'),
(66, 14, 'Peanut Leafhopper', 'Peanut leafhoppers are small, greenish-yellow insects that suck sap from peanut plants, causing stippling and yellowing of leaves.', 'Spray affected plants with insecticidal soap or neem oil. Maintain proper plant nutrition to reduce plant stress.', 'peanut_leafhopper.png'),
(67, 14, 'Peanut Webworm', 'Peanut webworms are small caterpillars that web together peanut leaves and feed within the sheltered area, causing defoliation.', 'Handpick and destroy webworms found on plants. Apply insecticides if infestation levels exceed thresholds.', 'peanut_webworm.png'),
(68, 14, 'Peanut Root-knot Nematode', 'Peanut root-knot nematodes are microscopic roundworms that infect peanut roots, causing galls and stunted growth. They can lead to yield losses if left unmanaged.', 'Rotate crops with non-host plants to reduce nematode populations. Use resistant peanut varieties if available.', 'peanut_root_knot_nematode.png'),
(69, 14, 'Peanut Armyworm', 'Peanut armyworms are larvae of moths that feed on peanut foliage, causing ragged leaf edges and defoliation.', 'Apply insecticides labeled for armyworm control when larvae are detected. Monitor fields regularly for signs of armyworm damage.', 'armyworms.png'),
(70, 14, 'Peanut Podborer', 'Peanut podborers are caterpillars that bore into peanut pods, feeding on developing kernels and causing yield loss.', 'Harvest peanuts early to minimize podborer damage. Use biological control agents such as parasitic wasps if available.', 'peanut_podborer.png');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `FollowerID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FollowerUserID` int(11) DEFAULT NULL,
  `FollowDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`FollowerID`, `UserID`, `FollowerUserID`, `FollowDate`) VALUES
(1, 1, 2, '2024-04-13 11:05:32'),
(2, 2, 3, '2024-04-13 11:05:32'),
(3, 3, 4, '2024-04-13 11:05:32'),
(4, 4, 5, '2024-04-13 11:05:32'),
(5, 5, 6, '2024-04-13 11:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `info_attributes`
--

CREATE TABLE `info_attributes` (
  `attribute_id` int(11) NOT NULL,
  `info_id` int(50) NOT NULL,
  `attribute_name` varchar(100) DEFAULT NULL,
  `attribute_value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `info_attributes`
--

INSERT INTO `info_attributes` (`attribute_id`, `info_id`, `attribute_name`, `attribute_value`) VALUES
(1, 1, 'Lifespan', 'Perennial'),
(2, 1, 'Planting Time', 'Spring'),
(3, 1, 'Spread', '60-90 cm'),
(4, 1, 'Flower Size', 'Small'),
(5, 1, 'Stem Colour', 'Green'),
(6, 1, 'Leaf Type', 'Narrow, elongated leaves'),
(7, 1, 'Plant Type', 'Cereal'),
(8, 1, 'Plant Height', '60-120 cm'),
(9, 1, 'Leaf Color', 'Green'),
(10, 1, 'Flower Color', 'Yellow'),
(11, 1, 'Dormancy', 'No dormancy'),
(12, 1, 'Growth Rate', 'Moderate'),
(13, 2, 'Lifespan', 'Annual'),
(14, 2, 'Planting Time', 'Early spring or late summer'),
(15, 2, 'Spread', '30-60 cm'),
(16, 2, 'Flower Size', 'Small'),
(17, 2, 'Stem Colour', 'Green'),
(18, 2, 'Leaf Type', 'Broad, flat leaves'),
(19, 2, 'Plant Type', 'Vegetable'),
(20, 2, 'Plant Height', '30-45 cm'),
(21, 2, 'Leaf Color', 'Green'),
(22, 2, 'Flower Color', 'Yellow'),
(23, 2, 'Dormancy', 'Non-dormant'),
(24, 2, 'Growth Rate', 'Fast'),
(25, 3, 'Lifespan', 'Annual'),
(26, 3, 'Planting Time', 'Early spring or fall'),
(27, 3, 'Spread', '15-30 cm'),
(28, 3, 'Flower Size', 'Small'),
(29, 3, 'Stem Colour', 'Green'),
(30, 3, 'Leaf Type', 'Narrow, elongated leaves'),
(31, 3, 'Plant Type', 'Cereal grain'),
(32, 3, 'Plant Height', '50-100 cm'),
(33, 3, 'Leaf Color', 'Green'),
(34, 3, 'Flower Color', 'Brown'),
(35, 3, 'Dormancy', 'Non-dormant'),
(36, 3, 'Growth Rate', 'Medium'),
(37, 4, 'Lifespan', 'Annual'),
(38, 4, 'Planting Time', 'Early spring'),
(39, 4, 'Spread', '20-30 cm'),
(40, 4, 'Flower Size', 'Small'),
(41, 4, 'Stem Colour', 'Green'),
(42, 4, 'Leaf Type', 'Narrow, linear leaves'),
(43, 4, 'Plant Type', 'Cereal grain'),
(44, 4, 'Plant Height', '60-100 cm'),
(45, 4, 'Leaf Color', 'Green'),
(46, 4, 'Flower Color', 'Yellow'),
(47, 4, 'Dormancy', 'Non-dormant'),
(48, 4, 'Growth Rate', 'Medium'),
(49, 5, 'Lifespan', 'Annual'),
(50, 5, 'Planting Time', 'Spring'),
(51, 5, 'Spread', '45-60 cm'),
(52, 5, 'Flower Size', 'Small'),
(53, 5, 'Stem Colour', 'Green'),
(54, 5, 'Leaf Type', 'Compound'),
(55, 5, 'Plant Type', 'Vegetable'),
(56, 5, 'Plant Height', '60-180 cm'),
(57, 5, 'Leaf Color', 'Green'),
(58, 5, 'Flower Color', 'Yellow'),
(59, 5, 'Dormancy', 'Non-dormant'),
(60, 5, 'Growth Rate', 'Medium'),
(61, 6, 'Lifespan', 'Perennial'),
(62, 6, 'Planting Time', 'Spring'),
(63, 6, 'Spread', '30-60 cm'),
(64, 6, 'Flower Size', 'Small'),
(65, 6, 'Stem Colour', 'Green'),
(66, 6, 'Leaf Type', 'Compound'),
(67, 6, 'Plant Type', 'Vegetable'),
(68, 6, 'Plant Height', '30-60 cm'),
(69, 6, 'Leaf Color', 'Green'),
(70, 6, 'Flower Color', 'White, pink, purple'),
(71, 6, 'Dormancy', 'Non-dormant'),
(72, 6, 'Growth Rate', 'Moderate'),
(73, 7, 'Lifespan', 'Biennial'),
(74, 7, 'Planting Time', 'Early spring or late summer'),
(75, 7, 'Spread', '10-15 cm'),
(76, 7, 'Root Size', 'Medium to large'),
(77, 7, 'Root Shape', 'Tapered cylindrical'),
(78, 7, 'Root Color', 'Orange'),
(79, 7, 'Leaf Type', 'Compound'),
(80, 7, 'Plant Type', 'Vegetable'),
(81, 7, 'Plant Height', '30-60 cm'),
(82, 7, 'Leaf Color', 'Green'),
(83, 7, 'Flower Color', 'White'),
(84, 7, 'Dormancy', 'Non-dormant'),
(85, 7, 'Growth Rate', 'Medium'),
(86, 8, 'Lifespan', 'Annual'),
(87, 8, 'Planting Time', 'Spring, Fall'),
(88, 8, 'Spread', '20-30 cm'),
(89, 8, 'Leaf Size', 'Medium'),
(90, 8, 'Stem Colour', 'Green'),
(91, 8, 'Leaf Type', 'Ruffled, curly'),
(92, 8, 'Plant Type', 'Leafy green vegetable'),
(93, 8, 'Plant Height', '15-30 cm'),
(94, 8, 'Leaf Color', 'Green'),
(95, 8, 'Harvest Time', '6-8 weeks after planting'),
(96, 8, 'Growth Rate', 'Fast'),
(97, 9, 'Lifespan', 'Annual'),
(98, 9, 'Planting Time', 'Spring'),
(99, 9, 'Spread', '30-45 cm'),
(100, 9, 'Flower Size', 'Small'),
(101, 9, 'Stem Colour', 'Green'),
(102, 9, 'Leaf Type', 'Broad, flat leaves'),
(103, 9, 'Plant Type', 'Vegetable'),
(104, 9, 'Plant Height', '45-60 cm'),
(105, 9, 'Leaf Color', 'Green'),
(106, 9, 'Flower Color', 'White'),
(107, 9, 'Dormancy', 'Non-dormant'),
(108, 9, 'Growth Rate', 'Fast'),
(109, 10, 'Planting Depth', '1 cm'),
(110, 10, 'Spacing', '30 cm'),
(111, 10, 'Soil Type', 'Well-drained, loamy soil'),
(112, 10, 'Sunlight', 'Full sun to partial shade'),
(113, 10, 'Watering', 'Regular watering'),
(114, 10, 'Fertilization', 'Monthly during growing season'),
(115, 10, 'Fruit Size', 'Medium'),
(116, 10, 'Fruit Color', 'Red'),
(117, 10, 'Harvest Time', 'Summer to early fall'),
(118, 10, 'Hardiness Zone', '3-10'),
(119, 10, 'Propagation', 'Runners, division'),
(120, 10, 'Disease Resistance', 'Moderate resistance to common diseases'),
(121, 11, 'Lifespan', 'Annual'),
(122, 11, 'Planting Time', 'Spring'),
(123, 11, 'Spread', '20-50 cm'),
(124, 11, 'Flower Size', 'Small'),
(125, 11, 'Stem Colour', 'Green'),
(126, 11, 'Leaf Type', 'Compound'),
(127, 11, 'Plant Type', 'Legume'),
(128, 11, 'Plant Height', '30-100 cm'),
(129, 11, 'Leaf Color', 'Green'),
(130, 11, 'Flower Color', 'Purple'),
(131, 11, 'Dormancy', 'Non-dormant'),
(132, 11, 'Growth Rate', 'Medium'),
(133, 12, 'Lifespan', 'Annual or perennial'),
(134, 12, 'Planting Time', 'Spring'),
(135, 12, 'Spread', '20-60 cm'),
(136, 12, 'Flower Size', 'Small'),
(137, 12, 'Stem Colour', 'Green'),
(138, 12, 'Leaf Type', 'Palmate'),
(139, 12, 'Plant Type', 'Legume'),
(140, 12, 'Plant Height', '30-90 cm'),
(141, 12, 'Leaf Color', 'Green'),
(142, 12, 'Flower Color', 'White, pink, purple'),
(143, 12, 'Dormancy', 'Non-dormant'),
(144, 12, 'Growth Rate', 'Medium'),
(145, 13, 'Lifespan', 'Annual'),
(146, 13, 'Planting Time', 'Spring'),
(147, 13, 'Spread', '60-120 cm'),
(148, 13, 'Flower Size', 'Large'),
(149, 13, 'Stem Colour', 'Green'),
(150, 13, 'Leaf Type', 'Broad, hairy leaves'),
(151, 13, 'Plant Type', 'Flowering plant'),
(152, 13, 'Plant Height', '150-300 cm'),
(153, 13, 'Leaf Color', 'Green'),
(154, 13, 'Flower Color', 'Yellow'),
(155, 13, 'Dormancy', 'Non-dormant'),
(156, 13, 'Growth Rate', 'Fast'),
(157, 14, 'Lifespan', 'Annual'),
(158, 14, 'Planting Time', 'Spring'),
(159, 14, 'Spread', '20-30 cm'),
(160, 14, 'Flower Size', 'Small'),
(161, 14, 'Stem Colour', 'Green'),
(162, 14, 'Leaf Type', 'Compound'),
(163, 14, 'Plant Type', 'Legume'),
(164, 14, 'Plant Height', '15-50 cm'),
(165, 14, 'Leaf Color', 'Green'),
(166, 14, 'Flower Color', 'Yellow'),
(167, 14, 'Dormancy', 'Non-dormant'),
(168, 14, 'Growth Rate', 'Medium');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `LikeID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `PostID` int(11) DEFAULT NULL,
  `LikeDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`LikeID`, `UserID`, `PostID`, `LikeDate`) VALUES
(3, 2, 2, '2024-04-13 11:05:32'),
(4, 4, 2, '2024-04-13 11:05:32'),
(5, 7, 3, '2024-04-13 11:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `latlngs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`latlngs`)),
  `crop_id` int(11) DEFAULT NULL,
  `soil_texture` varchar(255) DEFAULT NULL,
  `ph` varchar(10) DEFAULT NULL,
  `nitrogen` varchar(20) DEFAULT NULL,
  `potassium` varchar(20) DEFAULT NULL,
  `phosphorus` varchar(20) DEFAULT NULL,
  `tilage_practice` varchar(20) DEFAULT NULL,
  `tilage_depth` varchar(20) DEFAULT NULL,
  `tilage_timing` varchar(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `map`
--

INSERT INTO `map` (`id`, `user_id`, `latlngs`, `crop_id`, `soil_texture`, `ph`, `nitrogen`, `potassium`, `phosphorus`, `tilage_practice`, `tilage_depth`, `tilage_timing`, `name`, `address`) VALUES
(2298, 1, '[{\"lat\":2.134678151603855,\"lng\":103.20863590192424},{\"lat\":2.1535409048724086,\"lng\":103.20863590192424},{\"lat\":2.1535409048724086,\"lng\":103.25326493792284},{\"lat\":2.134678151603855,\"lng\":103.25326493792284}]', NULL, '', '', '', '', '', '', '', '', '', ''),
(2299, 1, '[{\"lat\":2.031712807176461,\"lng\":103.2246128172818},{\"lat\":2.043202719522067,\"lng\":103.2246128172818},{\"lat\":2.043202719522067,\"lng\":103.23851647849675},{\"lat\":2.031712807176461,\"lng\":103.23851647849675}]', 2, '', '', '', '', '', '', '', '', '', ''),
(2300, 1, '[{\"lat\":2.0378865016118946,\"lng\":103.18461833502155},{\"lat\":2.0450891151980453,\"lng\":103.18461833502155},{\"lat\":2.0450891151980453,\"lng\":103.19714879512887},{\"lat\":2.0378865016118946,\"lng\":103.19714879512887}]', NULL, '', '', '', '', '', '', '', '', '', ''),
(2301, 1, '[{\"lat\":2.0594702363957342,\"lng\":103.2429885864258},{\"lat\":2.0598563636160767,\"lng\":103.24361085891725},{\"lat\":2.0601137817109545,\"lng\":103.24530601501466},{\"lat\":2.0548581540349353,\"lng\":103.24876070022584},{\"lat\":2.0535710589044305,\"lng\":103.24715137481691}]', 2, '', '', '', '', '', '', '', '', '', ''),
(2302, 1, '[{\"lat\":2.0907025704379647,\"lng\":103.1722640991211},{\"lat\":2.092761873837805,\"lng\":103.1722640991211},{\"lat\":2.092761873837805,\"lng\":103.1829071044922},{\"lat\":2.0907025704379647,\"lng\":103.1829071044922}]', NULL, 'Loamy soil', '6.5', '20 ppm', '15 ppm', '10 ppm', 'plowing', '12 inches', 'Spring planting seas', 'John Doe', '123 Farm Road, Anytown, USA');

-- --------------------------------------------------------

--
-- Table structure for table `market`
--

CREATE TABLE `market` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price_per_unit` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `market`
--

INSERT INTO `market` (`id`, `name`, `description`, `category`, `price_per_unit`, `quantity`, `image_url`, `user_id`) VALUES
(13, 'Sunflower Seeds', 'Organic sunflower seeds for planting or snacking.', 'Flowers', '5.99', 1000, 'sunflower.jpg', 2),
(16, 'Carrot Seeds', 'Sweet and crunchy carrot seeds for home gardens.', 'Vegetables', '4.25', 1083, 'carrot.png', 2),
(18, 'Rose Seeds', 'Beautiful rose seeds for your garden.', 'Flowers', '49.99', 300, 'redRoses.jpg', 1),
(19, 'Spinach Seeds', 'Nutritious spinach seeds for home gardens.', 'Vegetables', '3.93', 600, 'spinach.jpg', 1),
(20, 'Mint Seeds', 'Refreshing mint seeds for culinary and medicinal uses.', 'Herbs', '2.49', 399, 'mint.jpg', 2),
(21, 'Zinnia Seeds', 'Colorful zinnia flower seeds to brighten your garden.', 'Flowers', '4.99', 900, 'zinnia.jpg', 1),
(22, 'Cucumber Seeds', 'Crunchy cucumber seeds for fresh salads and pickling.', 'Vegetables', '2.75', 1100, 'cucumber.jpg', 1),
(23, 'Sage Seeds', 'Aromatic sage seeds for culinary and medicinal purposes.', 'Herbs', '3.79', 550, 'sage.jpg', 1),
(24, 'Daisy Seeds', 'Delicate daisy flower seeds for charming gardens.', 'Flowers', '5.49', 700, 'daissy.jpg', 2),
(28, 'Jun Heng Choo', 'hi', 'Vegetables', '22.00', 1, 'download (3).png', 1),
(29, 'Jun Heng Choo', 'hi', 'Vegetables', '2.00', 1, 'allpurpose.jpeg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `MediaID` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  `MediaType` enum('image','video') DEFAULT NULL,
  `MediaURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`MediaID`, `PostID`, `MediaType`, `MediaURL`) VALUES
(1, 1, 'image', '../images/veg1.jpg'),
(2, 1, 'image', './images/veg4.jpg'),
(3, 2, 'image', '../images/veg2.jpg'),
(4, 2, 'image', '../images/veg3.jpg'),
(5, 7, 'image', '../images/veg5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `other_names`
--

CREATE TABLE `other_names` (
  `other_id` int(11) NOT NULL,
  `encyclopedia_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `other_names`
--

INSERT INTO `other_names` (`other_id`, `encyclopedia_id`, `name`) VALUES
(1, 1, 'Grain'),
(2, 1, 'Cereal'),
(3, 1, 'Bread wheat'),
(4, 2, 'Maize'),
(5, 2, 'Sweet corn'),
(6, 2, 'Field corn'),
(7, 3, 'Malt'),
(8, 3, 'Barley grain'),
(9, 3, 'Malted barley'),
(10, 4, 'Rolled oats'),
(11, 4, 'Oat grain'),
(12, 4, 'Oatmeal'),
(13, 5, 'Red tomato'),
(14, 5, 'Cherry tomato'),
(15, 5, 'Heirloom tomato'),
(16, 6, 'Spud'),
(17, 6, 'Tater'),
(18, 6, 'Irish potato'),
(19, 7, 'Wild carrot'),
(20, 7, 'Carrot root'),
(21, 7, 'Garden carrot'),
(22, 8, 'Leaf lettuce'),
(23, 8, 'Head lettuce'),
(24, 8, 'Iceberg lettuce'),
(25, 9, 'Sweet pepper'),
(26, 9, 'Capsicum'),
(27, 9, 'Green pepper'),
(28, 10, 'Wild strawberry'),
(29, 10, 'June-bearing strawberry'),
(30, 10, 'Everbearing strawberry'),
(31, 11, 'Glycine'),
(32, 11, 'Edamame'),
(33, 11, 'Soy'),
(34, 12, 'String bean'),
(35, 12, 'Green bean'),
(36, 12, 'Snap bean'),
(37, 13, 'Helianthus'),
(38, 13, 'Sunflower seed'),
(39, 13, 'Sunflower plant'),
(40, 14, 'Groundnut'),
(41, 14, 'Earthnut'),
(42, 14, 'Goober');

-- --------------------------------------------------------

--
-- Table structure for table `planting`
--

CREATE TABLE `planting` (
  `id` int(11) NOT NULL,
  `landId` int(11) DEFAULT NULL,
  `cultivar` varchar(255) DEFAULT NULL,
  `plantingMethod` varchar(50) DEFAULT NULL,
  `seedTreatment` varchar(50) DEFAULT NULL,
  `plantingAmount` int(11) DEFAULT NULL,
  `nurseryStartDate` date DEFAULT NULL,
  `nurseryDays` int(11) DEFAULT NULL,
  `plantingDate` date DEFAULT NULL,
  `daysToMature` int(11) DEFAULT NULL,
  `firstHarvestDay` varchar(100) DEFAULT NULL,
  `noOfRows` int(11) DEFAULT NULL,
  `rowSpacing` int(11) DEFAULT NULL,
  `spacingOnRows` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `planting`
--

INSERT INTO `planting` (`id`, `landId`, `cultivar`, `plantingMethod`, `seedTreatment`, `plantingAmount`, `nurseryStartDate`, `nurseryDays`, `plantingDate`, `daysToMature`, `firstHarvestDay`, `noOfRows`, `rowSpacing`, `spacingOnRows`) VALUES
(21, 2299, '', '', '', 0, '2024-04-11', 12, '2024-04-11', 9, 'Sat Apr 20 2024', 8, 13, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `PostID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Content` text NOT NULL,
  `PostDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`PostID`, `UserID`, `Content`, `PostDate`) VALUES
(1, 1, 'Just enjoying a sunny day! ☀️\"Where words fail, music speaks.\" Music has a unique ability to convey emotions and messages that words alone often cannot express. It transcends language barriers and touches the deepest parts of our souls, connecting us on a profound level. \"In the dance of life, find your rhythm.\" Life is a continuous journey filled with ups and downs, twists and turns. It\'s essential to discover your own pace, passions, and purpose amidst the chaos, just as a dancer finds harmony in movement. \"Let your dreams be your wings.\" Dreams are not just fleeting thoughts; they are aspirations that give us direction and motivation. They empower us to reach for the stars, pushing boundaries and defying limits along the way.', '2024-04-13 11:05:32'),
(2, 2, 'Dinner time with friends! 🍽️🥂', '2024-04-13 11:05:32'),
(3, 3, 'New book added to my collection! 📚', '2024-04-13 11:05:32'),
(4, 4, 'Exploring nature trails today! 🌳🚶‍♀️', '2024-04-13 11:05:32'),
(5, 5, 'Coding late into the night! 💻🌙', '2024-04-13 11:05:32'),
(6, 6, 'Movie night with popcorn! 🍿🎬', '2024-04-13 11:05:32'),
(7, 7, 'Weekend getaway at the beach! 🏖️🌊', '2024-04-13 11:05:32'),
(8, 8, 'Trying out new recipes in the kitchen! 🍳🥗', '2024-04-13 11:05:32'),
(9, 9, 'Morning jog to start the day! 🏃‍♂️☀️', '2024-04-13 11:05:32'),
(10, 10, 'Art exhibition visit! 🎨✨', '2024-04-13 11:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `date` date NOT NULL,
  `is_completed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `user_id`, `map_id`, `name`, `date`, `is_completed`) VALUES
(10, 1, 22, 'edfwef', '2024-04-25', 0),
(11, 1, 22, 'wwww', '2024-04-11', 0),
(12, 1, 22, 'wefwef', '2024-04-13', 0),
(13, 1, 22, 'abcde', '2024-04-28', 1),
(20, 1, 27, 'zzz', '2024-04-09', 0),
(23, 1, 336, '9', '2024-04-06', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DateJoined` timestamp NOT NULL DEFAULT current_timestamp(),
  `ProfilePictureURL` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`, `DateJoined`, `ProfilePictureURL`, `balance`) VALUES
(1, 'John Doe', 'john@example.com', 'password123', '2024-04-13 11:05:32', NULL, 0.2599999999999998),
(2, 'Jane Smith', 'jane@example.com', 'password456', '2024-04-13 11:05:32', NULL, 0),
(3, 'Alex Johnson', 'alex@example.com', 'password789', '2024-04-13 11:05:32', NULL, 0),
(4, 'Emily Wilson', 'emily@example.com', 'passwordabc', '2024-04-13 11:05:32', NULL, 0),
(5, 'Michael Brown', 'michael@example.com', 'passworddef', '2024-04-13 11:05:32', NULL, 0),
(6, 'Emma Davis', 'emma@example.com', 'passwordghi', '2024-04-13 11:05:32', NULL, 0),
(7, 'James Taylor', 'james@example.com', 'passwordjkl', '2024-04-13 11:05:32', NULL, 0),
(8, 'Sophia Martinez', 'sophia@example.com', 'passwordmno', '2024-04-13 11:05:32', NULL, 0),
(9, 'William Clark', 'william@example.com', 'passwordpqr', '2024-04-13 11:05:32', NULL, 0),
(10, 'Olivia Anderson', 'olivia@example.com', 'passwordstu', '2024-04-13 11:05:32', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_achievements`
--

CREATE TABLE `user_achievements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quiz_completed` int(11) NOT NULL,
  `lecture_hours` int(11) NOT NULL,
  `projects_completed` int(11) NOT NULL,
  `crops_planted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_achievements`
--

INSERT INTO `user_achievements` (`id`, `user_id`, `quiz_completed`, `lecture_hours`, `projects_completed`, `crops_planted`) VALUES
(1, 1, 10, 30, 5, 50),
(2, 2, 9, 9, 2, 6),
(3, 3, 2, 8, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `user_gamification`
--

CREATE TABLE `user_gamification` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `level_progress` int(11) NOT NULL,
  `ranking` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_gamification`
--

INSERT INTO `user_gamification` (`id`, `level`, `level_progress`, `ranking`, `user_id`) VALUES
(1, 3, 50, 6, 1),
(2, 7, 40, 2, 2),
(3, 1, 10, 9, 3),
(4, 4, 15, 4, 4),
(5, 3, 60, 5, 5),
(6, 2, 45, 7, 6),
(7, 1, 30, 8, 7),
(8, 1, 10, 9, 8),
(9, 6, 90, 3, 9),
(10, 8, 80, 1, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounting`
--
ALTER TABLE `accounting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`CollectionID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `PostID` (`PostID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `PostID` (`PostID`);

--
-- Indexes for table `crop`
--
ALTER TABLE `crop`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `encyclopedia`
--
ALTER TABLE `encyclopedia`
  ADD PRIMARY KEY (`encyclopedia_id`);

--
-- Indexes for table `encyclopedia_cares`
--
ALTER TABLE `encyclopedia_cares`
  ADD PRIMARY KEY (`care_id`),
  ADD KEY `fk_encyclopedia_cares_encyclopedia_id` (`encyclopedia_id`);

--
-- Indexes for table `encyclopedia_disease`
--
ALTER TABLE `encyclopedia_disease`
  ADD PRIMARY KEY (`disease_id`),
  ADD KEY `fk_encyclopedia_disease_encyclopedia_id` (`encyclopedia_id`);

--
-- Indexes for table `encyclopedia_faq`
--
ALTER TABLE `encyclopedia_faq`
  ADD PRIMARY KEY (`faq_id`),
  ADD KEY `fk_encyclopedia_faq_encyclopedia_id` (`encyclopedia_id`);

--
-- Indexes for table `encyclopedia_info`
--
ALTER TABLE `encyclopedia_info`
  ADD PRIMARY KEY (`info_id`),
  ADD KEY `fk_encyclopedia_info_encyclopedia_id` (`encyclopedia_id`);

--
-- Indexes for table `encyclopedia_pest`
--
ALTER TABLE `encyclopedia_pest`
  ADD PRIMARY KEY (`pest_id`),
  ADD KEY `fk_encyclopedia_pest_encyclopedia_id` (`encyclopedia_id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`FollowerID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `FollowerUserID` (`FollowerUserID`);

--
-- Indexes for table `info_attributes`
--
ALTER TABLE `info_attributes`
  ADD PRIMARY KEY (`attribute_id`),
  ADD KEY `fk_info_attributes_attribute_id` (`info_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`LikeID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `PostID` (`PostID`);

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `crop_id` (`crop_id`);

--
-- Indexes for table `market`
--
ALTER TABLE `market`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`MediaID`),
  ADD KEY `PostID` (`PostID`);

--
-- Indexes for table `other_names`
--
ALTER TABLE `other_names`
  ADD PRIMARY KEY (`other_id`),
  ADD KEY `fk_other_id_encyclopedia_id` (`encyclopedia_id`);

--
-- Indexes for table `planting`
--
ALTER TABLE `planting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `planting_ibfk_1` (`landId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `task_ibfk_1` (`map_id`),
  ADD KEY `task_ibfk_2` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_gamification`
--
ALTER TABLE `user_gamification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounting`
--
ALTER TABLE `accounting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `CollectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `CommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `crop`
--
ALTER TABLE `crop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `LikeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2303;

--
-- AUTO_INCREMENT for table `market`
--
ALTER TABLE `market`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `MediaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `planting`
--
ALTER TABLE `planting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user_achievements`
--
ALTER TABLE `user_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_gamification`
--
ALTER TABLE `user_gamification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounting`
--
ALTER TABLE `accounting`
  ADD CONSTRAINT `accounting_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`) ON UPDATE CASCADE;

--
-- Constraints for table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `collections_ibfk_2` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE;

--
-- Constraints for table `encyclopedia_cares`
--
ALTER TABLE `encyclopedia_cares`
  ADD CONSTRAINT `fk_encyclopedia_cares_encyclopedia_id` FOREIGN KEY (`encyclopedia_id`) REFERENCES `encyclopedia` (`encyclopedia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `encyclopedia_disease`
--
ALTER TABLE `encyclopedia_disease`
  ADD CONSTRAINT `fk_encyclopedia_disease_encyclopedia_id` FOREIGN KEY (`encyclopedia_id`) REFERENCES `encyclopedia` (`encyclopedia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `encyclopedia_faq`
--
ALTER TABLE `encyclopedia_faq`
  ADD CONSTRAINT `fk_encyclopedia_faq_encyclopedia_id` FOREIGN KEY (`encyclopedia_id`) REFERENCES `encyclopedia` (`encyclopedia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `encyclopedia_info`
--
ALTER TABLE `encyclopedia_info`
  ADD CONSTRAINT `fk_encyclopedia_info_encyclopedia_id` FOREIGN KEY (`encyclopedia_id`) REFERENCES `encyclopedia` (`encyclopedia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `encyclopedia_pest`
--
ALTER TABLE `encyclopedia_pest`
  ADD CONSTRAINT `fk_encyclopedia_pest_encyclopedia_id` FOREIGN KEY (`encyclopedia_id`) REFERENCES `encyclopedia` (`encyclopedia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`FollowerUserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `info_attributes`
--
ALTER TABLE `info_attributes`
  ADD CONSTRAINT `fk_info_attributes_attribute_id` FOREIGN KEY (`info_id`) REFERENCES `encyclopedia_info` (`info_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `map`
--
ALTER TABLE `map`
  ADD CONSTRAINT `map_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `map_ibfk_2` FOREIGN KEY (`crop_id`) REFERENCES `crop` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `market`
--
ALTER TABLE `market`
  ADD CONSTRAINT `market_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`) ON UPDATE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`) ON DELETE CASCADE;

--
-- Constraints for table `other_names`
--
ALTER TABLE `other_names`
  ADD CONSTRAINT `fk_other_id_encyclopedia_id` FOREIGN KEY (`encyclopedia_id`) REFERENCES `encyclopedia` (`encyclopedia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `planting`
--
ALTER TABLE `planting`
  ADD CONSTRAINT `planting_ibfk_1` FOREIGN KEY (`landId`) REFERENCES `map` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `user_gamification`
--
ALTER TABLE `user_gamification`
  ADD CONSTRAINT `user_gamification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
