import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from '@chakra-ui/react';
import {
  Button,
  IconButton,
  SearchInput,
  Tab,
  TableBadge,
  Pagination,
  Avatar,
  DropdownSingle,
  ChevronDown,
  Plus,
  Upload,
  Dashboard,
  Chat,
  Email,
  Customers,
  Settings,
  Notification,
  Analytics,
  Info,
  Download,
  Calendar,
  Online,
  SMSCampaign,
  Schedule,
  Responses,
  Projects,
  Filter,
  ReputationManagment,
} from '@radiant/common/ui';

const NAV_ICONS = [
  { icon: Dashboard, label: 'Dashboard' },
  { icon: Chat, label: 'Chat' },
  { icon: Analytics, label: 'AI' },
  { icon: Filter, label: 'Filter' },
  { icon: Projects, label: 'Projects' },
  { icon: Email, label: 'Email' },
  { icon: Customers, label: 'Customers' },
  { icon: SMSCampaign, label: 'Campaign' },
  { icon: Responses, label: 'Responses' },
  { icon: Schedule, label: 'Schedule' },
  { icon: ReputationManagment, label: 'Reputation' },
  { icon: Analytics, label: 'Analytics' },
];

const STATUS_FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Draft', value: 'draft' },
];

type Campaign = {
  id: number;
  name: string;
  recipients: number;
  createdBy: string;
  startDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
};

const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: 'test2',
    recipients: 20,
    createdBy: 'Eltropy Admin User',
    startDate: '09/03/2025',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'ticket testing',
    recipients: 30,
    createdBy: 'Eltropy Admin User',
    startDate: '09/03/2025',
    status: 'ACTIVE',
  },
];

const STATUS_BADGE_VARIANT: Record<Campaign['status'], 'blue' | 'neutral' | 'green'> = {
  ACTIVE: 'blue',
  INACTIVE: 'neutral',
  DRAFT: 'neutral',
};

export function EmailCampaignPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = CAMPAIGNS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !statusFilter || statusFilter === 'all' || c.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tabData = [
    {
      label: 'Campaign',
      view: (
        <VStack align="stretch" spacing={6} pt={4}>
          {/* Filters */}
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            gap={3}
          >
            <Box w={{ base: 'full', md: '339px' }}>
              <SearchInput
                placeholder="search by campaign name"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </Box>
            <HStack spacing={3} flexWrap="wrap">
              <Box w="118px">
                <DropdownSingle
                  options={STATUS_FILTER_OPTIONS}
                  selectedOption={
                    STATUS_FILTER_OPTIONS.find((o) => o.value === statusFilter) ??
                    null
                  }
                  onChangeValue={(val) => setStatusFilter(val)}
                  showDownIcon
                />
              </Box>
              <Button
                label="Choose date range"
                variant="secondary"
                icon={Calendar}
                iconPos="left"
                size="md"
                w={{ base: 'full', sm: '200px' }}
                borderRadius="16px"
                color="gray.500"
                fontWeight="normal"
              />
            </HStack>
          </Flex>

          {/* Table */}
          <Box overflowX="auto">
            <Table variant="simple" size="md" minW="900px">
              <Thead>
                <Tr borderBottom="1px solid" borderColor="gray.200">
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="200px"
                    w="260px"
                  >
                    Name
                  </Th>
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="120px"
                    w="246px"
                  >
                    Recipients
                  </Th>
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="160px"
                    w="220px"
                  >
                    Created By
                  </Th>
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="120px"
                    w="164px"
                  >
                    Start Date
                  </Th>
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="120px"
                    w="205px"
                  >
                    Status
                  </Th>
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="60px"
                    w="82px"
                  >
                    Stats
                  </Th>
                  <Th
                    fontFamily="ABC Diatype, sans-serif"
                    fontWeight="bold"
                    color="#6F7489"
                    fontSize="14px"
                    textTransform="none"
                    minW="120px"
                    w="137px"
                  >
                    Reports
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filtered.map((campaign) => (
                  <Tr
                    key={campaign.id}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _hover={{ bg: 'gray.50' }}
                  >
                    <Td color="#11304F" fontSize="16px" py="20.5px">
                      {campaign.name}
                    </Td>
                    <Td color="#11304F" fontSize="16px" py="20.5px">
                      {campaign.recipients}
                    </Td>
                    <Td color="#11304F" fontSize="16px" py="20.5px">
                      {campaign.createdBy}
                    </Td>
                    <Td color="#11304F" fontSize="16px" py="20.5px">
                      {campaign.startDate}
                    </Td>
                    <Td py="13.75px">
                      <TableBadge
                        label={campaign.status}
                        variant={STATUS_BADGE_VARIANT[campaign.status]}
                      />
                    </Td>
                    <Td py="20.5px">
                      <IconButton
                        icon={<Info />}
                        variant="minimal"
                        aria-label="Stats"
                        size="sm"
                      />
                    </Td>
                    <Td py="20.5px">
                      <HStack spacing={3}>
                        <Button
                          label="Generate"
                          variant="secondary"
                          size="sm"
                          borderRadius="6px"
                          px={2}
                          py={2}
                          h="auto"
                        />
                        <IconButton
                          icon={<Download />}
                          variant="minimal"
                          aria-label="Download"
                          size="sm"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Pagination */}
          <Box px={{ base: 0, md: 6 }} pb={4}>
            <Pagination
              totalItems={filtered.length}
              currentPageNumber={1}
              limit={10}
              showLimitSelector
              size="sm"
            />
          </Box>
        </VStack>
      ),
    },
    {
      label: 'Sequences',
      view: (
        <Box py={8} textAlign="center" color="gray.400">
          No sequences yet
        </Box>
      ),
    },
    {
      label: 'Template',
      view: (
        <Box py={8} textAlign="center" color="gray.400">
          No templates yet
        </Box>
      ),
    },
  ];

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Left Sidebar */}
      <Flex
        as="nav"
        direction="column"
        align="center"
        bg="#292158"
        w="74px"
        minH="100vh"
        py={5}
        gap={4}
        flexShrink={0}
        overflowY="auto"
        display={{ base: 'none', lg: 'flex' }}
      >
        {NAV_ICONS.map(({ icon: NavIcon, label }) => (
          <IconButton
            key={label}
            icon={<NavIcon />}
            variant="action-dark"
            aria-label={label}
            size="md"
          />
        ))}
      </Flex>

      {/* Main Content */}
      <Flex direction="column" flex={1} overflow="hidden">
        {/* Top Navigation */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          minH="48px"
          px={{ base: 3, md: 6 }}
          bg="white"
          borderBottom="1px solid"
          borderColor="#DDDFE4"
          flexShrink={0}
        >
          <Text color="#11304F" fontSize="14px">
            Campaign
          </Text>
          <HStack spacing={{ base: 2, md: 4 }}>
            <IconButton
              icon={<Notification />}
              variant="minimal"
              aria-label="Notifications"
              size="sm"
            />
            <IconButton
              icon={<Settings />}
              variant="minimal"
              aria-label="Settings"
              size="sm"
            />
            <Button
              label="Available"
              variant="secondary"
              icon={Online}
              iconPos="left"
              size="sm"
              rightIcon={<Icon as={ChevronDown} fontSize="16px" />}
              borderRadius="8px"
              bg="#F4F6F8"
              border="none"
              _hover={{ bg: '#E8EBF0' }}
              display={{ base: 'none', sm: 'flex' }}
            />
            <Avatar
              id="current-user"
              name="Admin User"
              size="sm"
              showBadge
              badgeStatus="online"
            />
          </HStack>
        </Flex>

        {/* Page Body */}
        <Box flex={1} overflowY="auto" bg="white">
          <Box pt={6}>
            {/* Page Header */}
            <Flex
              px={{ base: 3, md: 6 }}
              justify="space-between"
              align={{ base: 'flex-start', sm: 'center' }}
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 3, sm: 0 }}
              mb={6}
            >
              <Text
                fontSize="24px"
                fontWeight="bold"
                color="rgba(0,0,0,0.85)"
              >
                Email
              </Text>
              <HStack spacing={3} flexWrap="wrap">
                <Button
                  label="Export"
                  variant="secondary"
                  icon={Upload}
                  iconPos="left"
                  size="md"
                  borderRadius="16px"
                  bg="#F4F6F8"
                  border="none"
                  color="#11304F"
                />
                <Link to="/new-campaign" style={{ textDecoration: 'none' }}>
                  <Button
                    label="New Campaign"
                    variant="primary"
                    icon={Plus}
                    iconPos="left"
                    size="md"
                    borderRadius="16px"
                    bg="#48B5B5"
                    _hover={{ bg: '#3DA3A3' }}
                    color="white"
                  />
                </Link>
              </HStack>
            </Flex>

            {/* Tab Component */}
            <Tab
              variant="light"
              data={tabData}
              selectedTabIndex={tabIndex}
              onChangeTabIndex={setTabIndex}
              children={null}
            />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default EmailCampaignPage;
